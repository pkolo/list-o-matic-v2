class AddListRefToBallot < ActiveRecord::Migration[5.0]
  def change
    add_reference :ballots, :list, index: true
  end
end
