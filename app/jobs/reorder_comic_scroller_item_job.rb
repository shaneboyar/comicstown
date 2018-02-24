class ReorderComicScrollerItemJob < ApplicationJob
  queue_as :default

  def perform(item_id, new_index)
    @item = ComicScrollerItem.find(item_id)
    @item.position = new_index
    @item.save # TODO: Error handling
  end
end
