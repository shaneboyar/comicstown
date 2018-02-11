class WritersController < ApplicationController
  def index
    @writers = Writer.pluck(:name).uniq.sort
  end
end
