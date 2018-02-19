module Api
  module V1
    class TagsController < ApplicationController
      def create
        @issue = Issue.find(params[:id])
        @issue.tag_list.add(params[:tag])
        respond_to do |format|
          if @issue.save
            format.js
            format.json { render json: @issue, status: 200, location: @issue }
          else
            format.json { render json: @issue.errors, status: :unprocessable_entity }
          end
        end
      end
      def destroy
        @issue = Issue.find(params[:id])
        @issue.tag_list.remove(params[:tag])
        respond_to do |format|
          if @issue.save
            format.js
            format.json { render json: @issue, status: 200, location: @issue }
          else
            format.json { render json: @issue.errors, status: :unprocessable_entity }
          end
        end
      end
    end
  end
end

