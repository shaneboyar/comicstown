# == Schema Information
#
# Table name: colorists
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Colorist < ApplicationRecord
  has_and_belongs_to_many :issues
end
