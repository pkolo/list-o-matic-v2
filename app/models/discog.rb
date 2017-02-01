class Discog < ApplicationRecord
  belongs_to :vote, :foreign_key => :album_id, :primary_key => :album_id
end
