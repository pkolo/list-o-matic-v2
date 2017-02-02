class Discog < ApplicationRecord
  has_many :votes, :foreign_key => :album_id, :primary_key => :album_id
end
