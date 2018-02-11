class Series < ApplicationRecord
  has_many :issues, dependent: :destroy
  belongs_to :publisher
end
