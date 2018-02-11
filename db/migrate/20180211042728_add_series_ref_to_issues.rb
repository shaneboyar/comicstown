class AddSeriesRefToIssues < ActiveRecord::Migration[5.1]
  def change
    add_reference :issues, :series, foreign_key: true
  end
end
