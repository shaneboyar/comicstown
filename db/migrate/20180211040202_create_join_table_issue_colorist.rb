class CreateJoinTableIssueColorist < ActiveRecord::Migration[5.1]
  def change
    create_join_table :issues, :colorists do |t|
      # t.index [:issue_id, :colorist_id]
      # t.index [:colorist_id, :issue_id]
    end
  end
end
