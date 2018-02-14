module Api
  module V1
    class IssuesController < ApplicationController
      def search
        query = Issue.search(params[:query], track: {user_id: params[:user_id]}, order: {title: :asc}, page: params[:page], per_page: 20)
        results = query.results
        render json: {
          issues: results,
          search_id: query.search.id,
          page: query.options[:page],
          total_pages: query.total_pages}
      end
    end
  end
end

