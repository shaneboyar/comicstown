class Admin::AdminController < ApplicationController
  layout 'admin'

  def root
    render "admin/root"
  end
end


