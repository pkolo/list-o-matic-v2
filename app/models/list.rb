class List < ApplicationRecord
  belongs_to :owner, class_name: User
  has_many :ballots
  has_many :voters, through: :ballots, class_name: User
  has_many :votes, through: :ballots

  validates :title, presence: true
  validates :maximum, presence: true

  def tally_results(limit=10)
    self.votes.each_with_object(Hash.new(0)) do |vote, memo|
      memo[vote.album_id] += ((self.maximum + 1) - vote.rank)
    end
  end

end
