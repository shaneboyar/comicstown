class CreateComicScrollers < ActiveRecord::Migration[5.1]
  def change
    create_table :comic_scrollers do |t|
      t.string :title

      t.timestamps
    end
  end
end
