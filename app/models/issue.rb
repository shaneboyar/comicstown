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

class Issue < ApplicationRecord
  searchkick

  has_and_belongs_to_many :writers
  has_and_belongs_to_many :artists
  has_and_belongs_to_many :inkers
  has_and_belongs_to_many :colorists
  belongs_to :series
  validates :title, presence: true, uniqueness: { scope: :series,
    message: "Issue titles should be unique per series" }

  def search_data
    {
      title: title,
      series: series.title,
      writers: writers.pluck(:name),
      artists: artists.pluck(:name),
      publisher: series.publisher.name,
      description: description
    }
  end
end
