class Admin::AdminController < ApplicationController
  layout 'admin'
  before_action :check_if_admin!

  def root
    render "admin/root"
  end

  protected
  def check_if_admin!
    unless current_user && current_user.admin?
      redirect_to new_user_session_path, :notice => 'if you want to add a notice'
      ## if you want render 404 page
      ## render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
    end
  end
end


