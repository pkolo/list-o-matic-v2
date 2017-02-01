class Vote < ApplicationRecord
  belongs_to :ballot

  validates :album_id, uniqueness: {scope: :ballot, message: "can only vote for album once per ballot"}
end
