class List < ApplicationRecord
  belongs_to :owner, class_name: User
  has_many :ballots
  has_many :voters, through: :ballots, class_name: User
end
