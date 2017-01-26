class AddOwnerToLists < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :owner_id, :integer
  end
end
