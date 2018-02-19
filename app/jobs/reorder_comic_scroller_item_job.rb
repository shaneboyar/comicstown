class ReorderComicScrollerItemJob < ApplicationJob
  queue_as :default

  def perform(issue_id, scroller_id, new_index)
    @item = ComicScrollerItem.where(issue_id: issue_id).where(comic_scroller_id: scroller_id).first
    @item.position = new_index
    @item.save # TODO: Error handling
  end
end
