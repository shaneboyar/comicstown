# == Schema Information
#
# Table name: series
#
#  id           :integer          not null, primary key
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  publisher_id :integer
#
# Indexes
#
#  index_series_on_publisher_id  (publisher_id)
#

class Series < ApplicationRecord
  has_many :issues, -> { order('title asc') }, dependent: :destroy
  belongs_to :publisher
  validates :title, uniqueness: true, presence: true
end
