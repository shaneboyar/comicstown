module Api
  module V1
    class ComicScrollersController < ApplicationController
      def update
        params[:updates].each do |_index, update|
          item = ComicScrollerItem.find(update["item_id"])
          item.update_attributes(position: update["new_index"])
        end
      end
    end
  end
end

