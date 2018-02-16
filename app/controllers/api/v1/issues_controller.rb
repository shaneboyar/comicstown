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
      def scroller
        type = params[:type]
        case type
        when 'new-releases'
          render json: Issue.where('release_date > ?', 9.days.ago).order(:title)
        when 'image-new-releases'
          render json: Issue.joins(series: :publisher).where('publishers.name = ?', "Image").order(:release_date, :title)
        end
      end
    end
  end
end

