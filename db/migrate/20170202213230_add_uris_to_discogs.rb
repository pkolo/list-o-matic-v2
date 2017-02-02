class AddUrisToDiscogs < ActiveRecord::Migration[5.0]
  def change
    add_column :discogs, :video_url, :string, default: ""
    add_column :discogs, :img_url, :string, default: ""
  end
end
