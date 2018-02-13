class SeriesController < ApplicationController
  def index
    @series = Series.all
  end

  def show
    @serie = Series.find(params[:id])
  end

end
