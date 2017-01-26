class Ballot < ApplicationRecord
  has_many :votes
  belongs_to :list
end
