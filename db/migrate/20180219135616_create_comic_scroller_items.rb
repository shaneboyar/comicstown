class CreateComicScrollerItems < ActiveRecord::Migration[5.1]
  def change
    create_table :comic_scroller_items do |t|
      t.references :comic_scroller, foreign_key: true
      t.references :issue, foreign_key: true
      t.integer :position, null: false

      t.timestamps
    end
  end
end
