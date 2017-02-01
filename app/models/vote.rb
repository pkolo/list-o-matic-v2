class Vote < ApplicationRecord
  belongs_to :ballot
  has_one :discog, :foreign_key => :album_id, :primary_key => :album_id

  validates :album_id, uniqueness: {scope: :ballot, message: "can only vote for album once per ballot"}
end
