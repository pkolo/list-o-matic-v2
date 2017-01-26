class Ballot < ApplicationRecord
  has_many :votes
  belongs_to :list
  belongs_to :voter, class_name: User
end
