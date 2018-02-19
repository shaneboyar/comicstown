# == Schema Information
#
# Table name: comic_scrollers
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ComicScroller < ApplicationRecord
  alias_attribute :items, :comic_scroller_items

  has_many :comic_scroller_items, dependent: :destroy
  validates :title, uniqueness: true, presence: true
end
