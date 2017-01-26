class AddColumnsToLists < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :title, :string
    add_column :lists, :maximum, :integer
  end
end
