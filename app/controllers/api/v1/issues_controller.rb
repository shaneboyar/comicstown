module Api
  module V1
    class IssuesController < ApplicationController
      def index
        render json: {issues: Issue.all}
      end
      def show
        render json: {issue: Issue.find_by(title: params[:id])}
      end
    end
  end
end

