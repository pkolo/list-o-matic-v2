class AddColumnsToVotes < ActiveRecord::Migration[5.0]
  def change
    add_column :votes, :album_id, :integer
    add_reference :votes, :ballot, index: true
  end
end
