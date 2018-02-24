module Api
  module V1
    class ComicScrollerItemsController < ApplicationController
      def create
        scroller = ComicScroller.find(params[:comic_scroller_id])
        issue = Issue.find(params[:issue_id])
        @item = ComicScrollerItem.new(comic_scroller: scroller, issue: issue, position: scroller.items.count)
        respond_to do |format|
          if @item.save
            format.json { render json: {id: @item.id, issue_id: issue.id, external_image_url: issue.external_image_url}, status: 200 }
          else
            format.json { render json: scroller.errors.full_messages, status: :unprocessable_entity }
          end
        end
      end

      def update
        ReorderComicScrollerItemJob.perform_later(params[:id], params[:comic_scroller_id], params[:newIndex])
      end

      def destroy
        @item = ComicScrollerItem.find(params[:id])
        respond_to do |format|
          if @item.destroy
            format.json { render json: @item, status: 200 }
          else
            format.json { render json: scroller.errors.full_messages, status: :unprocessable_entity }
          end
        end
      end
    end
  end
end
