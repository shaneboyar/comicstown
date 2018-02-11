class IssuesController < ApplicationController
  def index
    @issues = Issue.all.limit(25)
  end

  def show
    @issue = Issue.find(params[:id])
  end
end
