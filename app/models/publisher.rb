class Publisher < ApplicationRecord
  has_many :series, dependent: :destroy
end
