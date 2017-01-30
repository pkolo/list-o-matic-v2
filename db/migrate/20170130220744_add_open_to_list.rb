class AddOpenToList < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :open, :boolean, default: true
  end
end
