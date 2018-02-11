class CreateInkers < ActiveRecord::Migration[5.1]
  def change
    create_table :inkers do |t|
      t.string :name

      t.timestamps
    end
  end
end
