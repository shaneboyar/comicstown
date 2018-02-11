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

require 'test_helper'

class IssueTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
