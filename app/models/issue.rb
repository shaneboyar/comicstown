# == Schema Information
#
# Table name: issues
#
#  id           :integer          not null, primary key
#  title        :string
#  description  :text
#  page_count   :integer
#  release_date :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Issue < ApplicationRecord
  has_and_belongs_to_many :writers
  has_and_belongs_to_many :artists
  has_and_belongs_to_many :inkers
  has_and_belongs_to_many :colorists
end
