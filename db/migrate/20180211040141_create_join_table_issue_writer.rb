class CreateJoinTableIssueWriter < ActiveRecord::Migration[5.1]
  def change
    create_join_table :issues, :writers do |t|
      # t.index [:issue_id, :writer_id]
      # t.index [:writer_id, :issue_id]
    end
  end
end
