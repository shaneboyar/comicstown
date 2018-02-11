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

class Series < ApplicationRecord
  has_many :issues, dependent: :destroy
  belongs_to :publisher
  validates :title, uniqueness: true, presence: true
end
