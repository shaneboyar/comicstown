require 'test_helper'

class Admin::Merchandising::IssuesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_merchandising_issues_index_url
    assert_response :success
  end

  test "should get show" do
    get admin_merchandising_issues_show_url
    assert_response :success
  end

  test "should get edit" do
    get admin_merchandising_issues_edit_url
    assert_response :success
  end

  test "should get delete" do
    get admin_merchandising_issues_delete_url
    assert_response :success
  end

end
