# == Schema Information
#
# Table name: publishers
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Publisher < ApplicationRecord
  has_many :series, -> { order('title asc') }, dependent: :destroy
  validates :name, uniqueness: true, presence: true
end
