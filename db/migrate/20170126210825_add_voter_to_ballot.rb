class AddVoterToBallot < ActiveRecord::Migration[5.0]
  def change
    add_column :ballots, :voter_id, :integer
  end
end
