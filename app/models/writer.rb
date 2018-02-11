# == Schema Information
#
# Table name: writers
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Writer < ApplicationRecord
  has_and_belongs_to_many :issues
  validates :name, uniqueness: true
end
