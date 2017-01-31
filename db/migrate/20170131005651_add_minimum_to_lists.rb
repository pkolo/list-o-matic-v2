class AddMinimumToLists < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :minimum, :integer, :default => 10
  end
end
