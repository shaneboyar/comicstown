class ReindexIssuesJob < ApplicationJob
  queue_as :default

  def perform()
    Issue.reindex
  end
end
