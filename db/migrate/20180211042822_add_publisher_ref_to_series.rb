class AddPublisherRefToSeries < ActiveRecord::Migration[5.1]
  def change
    add_reference :series, :publisher, foreign_key: true
  end
end
