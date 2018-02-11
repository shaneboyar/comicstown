class AddExternalImageUrlToIssues < ActiveRecord::Migration[5.1]
  def change
    add_column :issues, :external_image_url, :string
  end
end
