class CreateColorists < ActiveRecord::Migration[5.1]
  def change
    create_table :colorists do |t|
      t.string :name

      t.timestamps
    end
  end
end
