module Api
  module V1
    class IssuesController < ApplicationController
      def search
        query = Issue.search(params[:query], track: {user_id: params[:uid]}, order: {title: :asc}, page: params[:page],  misspellings: false, per_page: 20)
        results = query.results
        render json: {
          issues: results,
          search_id: query.search.id,
          page: query.options[:page],
          total_pages: query.total_pages}
      end
      def index
        render json: { issues: Issue.all }
      end
      def new_releases
        render json: Issue.where('release_date > ?', 9.days.ago).order(:title)
      end
    end
  end
end

