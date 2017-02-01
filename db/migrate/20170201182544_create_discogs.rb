class CreateDiscogs < ActiveRecord::Migration[5.0]
  def change
    create_table :discogs do |t|
      t.integer :album_id
      t.string :artist
      t.string :title
      t.string :year
      t.string :label
    end
  end
end
