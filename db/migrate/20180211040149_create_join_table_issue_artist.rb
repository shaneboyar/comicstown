class CreateJoinTableIssueArtist < ActiveRecord::Migration[5.1]
  def change
    create_join_table :issues, :artists do |t|
      # t.index [:issue_id, :artist_id]
      # t.index [:artist_id, :issue_id]
    end
  end
end
