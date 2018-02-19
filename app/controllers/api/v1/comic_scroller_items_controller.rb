module Api
  module V1
    class ComicScrollerItemsController < ApplicationController
      def create
        scroller = ComicScroller.find(params[:comic_scroller_id])
        scroller.items.build(issue: Issue.find(params[:issue_id]), position: scroller.items.count)
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
      end
    end
  end
end
