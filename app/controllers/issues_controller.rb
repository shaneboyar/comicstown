class IssuesController < ApplicationController
  def index
    issue_chunks = Issue.all.in_groups_of(18)
    @number_of_pages = issue_chunks.count - 1
    @current_page = (params[:pg] || 1).to_i
    @issues = issue_chunks[@current_page].compact
  end

  def show
    @issue = Issue.find(params[:id])
    if params[:sid]
      search = Searchjoy::Search.find(params[:sid])
      search.convert(@issue)
    end
  end
end
