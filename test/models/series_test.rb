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
# Indexes
#
#  index_series_on_publisher_id  (publisher_id)
#

require 'test_helper'

class SeriesTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
