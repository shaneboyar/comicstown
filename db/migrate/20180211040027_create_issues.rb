class CreateIssues < ActiveRecord::Migration[5.1]
  def change
    create_table :issues do |t|
      t.string :title
      t.text :description
      t.integer :page_count
      t.datetime :release_date

      t.timestamps
    end
  end
end
