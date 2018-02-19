module Api
  module V1
    class ComicScrollerItemsController < ApplicationController
      def create
        scroller = ComicScroller.find(params[:comic_scroller_id])
        scroller.items.build(issue: Issue.find(params[:issue_id]), position: scroller.items.count)
        respond_to do |format|
          if scroller.save
            format.json { render json: Issue.find(params[:issue_id]), status: 200 }
          else
            format.json { render json: scroller.errors.full_messages, status: :unprocessable_entity }
          end
        end
      end

      def update
        ReorderComicScrollerItemJob.perform_later(params[:id], params[:comic_scroller_id], params[:newIndex])
      end

      def destroy
        @item = ComicScrollerItem.where(issue_id: params[:id]).where(comic_scroller_id: params[:comic_scroller_id]).first
        respond_to do |format|
          if @item.destroy
            format.json { render json: Issue.find(params[:id]), status: 200 }
          else
            format.json { render json: scroller.errors.full_messages, status: :unprocessable_entity }
          end
        end
      end
    end
  end
end
