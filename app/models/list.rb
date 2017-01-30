class List < ApplicationRecord
  include BallotsHelper

  belongs_to :owner, class_name: User
  has_many :ballots
  has_many :voters, through: :ballots, class_name: User
  has_many :votes, through: :ballots

  validates :title, presence: true
  validates :maximum, presence: true

  def list_to_json
    json = {
      id: self.id,
      title: self.title,
      voters: self.voters.select(:id, :username),
      results: self.get_list_results
    }
  end

  def tally_results
    self.votes.each_with_object(Hash.new(0)) do |vote, memo|
      memo[vote.album_id] += ((self.maximum + 1) - vote.rank)
    end
  end

  def get_list_results
    album_points = self.tally_results
    album_points.inject([]) do |memo, (album_id, points)|
      memo << {
        album_data: get_album_data(album_id),
        points: points,
        voters: self.get_album_voters(album_id)
      }
    end
  end

  def get_album_voters(id)
    self.voters.inject([]) do |memo, voter|
      ballot = voter.ballots.find_by(list: self)
      if ballot.votes.pluck(:album_id).include?(id)
        memo << {id: voter.id, username: voter.username, ballot_id: ballot.id}
      end
      memo
    end
  end

end
