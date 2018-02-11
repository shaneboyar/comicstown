class WritersController < ApplicationController
  def index
    @writers = Writer.all.order(:name)
  end
end
