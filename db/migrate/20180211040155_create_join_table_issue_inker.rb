class CreateJoinTableIssueInker < ActiveRecord::Migration[5.1]
  def change
    create_join_table :issues, :inkers do |t|
      # t.index [:issue_id, :inker_id]
      # t.index [:inker_id, :issue_id]
    end
  end
end
