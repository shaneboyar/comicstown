class PublishersController < ApplicationController
  def index
    @publishers = Publisher.all
  end
end
