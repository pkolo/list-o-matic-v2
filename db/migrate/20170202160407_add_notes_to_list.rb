class AddNotesToList < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :notes, :text
  end
end
