# == Schema Information
#
# Table name: issues
#
#  id                 :integer          not null, primary key
#  title              :string
#  description        :text
#  page_count         :integer
#  release_date       :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  series_id          :integer
#  external_image_url :string
#
# Indexes
#
#  index_issues_on_series_id  (series_id)
#

require 'elasticsearch/model'

class Issue < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  has_and_belongs_to_many :writers
  has_and_belongs_to_many :artists
  has_and_belongs_to_many :inkers
  has_and_belongs_to_many :colorists
  belongs_to :series
  validates :title, presence: true, uniqueness: { scope: :series,
    message: "Issue titles should be unique per series" }

  def as_indexed_json(options={})
    self.as_json(
      include: { writers:   { only: :name },
                 artists:   { only: :name },
                 inkers:    { only: :name },
                 colorists: { only: :name },
                 series:    { only: :title }
               })
  end
end
