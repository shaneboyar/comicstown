module Api
  module V1
    class IssuesController < ApplicationController
      def search
        render json: {issues: Issue.__elasticsearch__.search(params[:query]).results}
      end
    end
  end
end

