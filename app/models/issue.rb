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
  acts_as_taggable

  has_and_belongs_to_many :writers
  has_and_belongs_to_many :artists
  has_and_belongs_to_many :inkers
  has_and_belongs_to_many :colorists
  has_many :comic_scroller_items
  belongs_to :series
  validates :title, presence: true, uniqueness: { scope: :series,
    message: "Issue titles should be unique per series" }

  # TODO: Make Async
  after_commit :reindex_issue
  def reindex_issue
    ReindexIssuesJob.perform_later
  end

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

  def series_title
    series.title
  end

  def publisher_name
    series.publisher.name
  end

  def writer_names
    writers.pluck(:name).join(", ")
  end

  def artist_names
    artists.pluck(:name).join(", ")
  end
end
