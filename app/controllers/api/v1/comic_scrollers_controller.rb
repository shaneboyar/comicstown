module Api
  module V1
    class ComicScrollersController < ApplicationController
      def update
        @scroller = ComicScroller.find(params[:id])
        @scroller.items.build(issue: Issue.find(params[:issue_id]), position: @scroller.items.count)
        respond_to do |format|
          if @scroller.save
            format.js
            format.json { render json: @scroller, status: 200, location: @scroller }
          else
            format.json { render json: @scroller.errors, status: :unprocessable_entity }
          end
        end
      end
    end
  end
end

