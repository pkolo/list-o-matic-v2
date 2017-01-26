class AddRankToVote < ActiveRecord::Migration[5.0]
  def change
    add_column :votes, :rank, :integer
  end
end
