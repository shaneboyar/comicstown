module Api
  module V1
    class IssuesController < ApplicationController
      def search
        query = Issue.search(params[:query], track: {user_id: nil}, order: {title: :asc})
        results = query.results
        render json: {issues: results, search_id: query.search.id }
      end
    end
  end
end

