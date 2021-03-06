class List < ApplicationRecord
  include BallotsHelper

  belongs_to :owner, class_name: User
  has_many :ballots
  has_many :voters, through: :ballots, class_name: User
  has_many :votes, through: :ballots

  validates :title, presence: true
  validates :maximum, presence: true
  validates :minimum, presence: true

  def list_to_json
    json = {
      id: self.id,
      title: self.title,
      voters: self.get_list_voters,
      results: self.get_list_results
    }
  end

  def get_list_results
    album_points = self.tally_results
    album_points.inject([]) do |memo, (album_id, points)|
      memo << {
        album_data: Discog.find_by(album_id: album_id),
        points: points,
        voters: self.get_album_voters(album_id),
        reviews: self.get_album_reviews(album_id)
      }
    end
  end

  def tally_results
    self.votes.select {|vote| vote.ballot.votes.length >= self.minimum }.select {|vote| vote.rank <= self.maximum}.each_with_object(Hash.new(0)) do |vote, memo|
      memo[vote.album_id] += ((self.maximum + 1) - vote.rank)
    end
  end

  def get_list_voters
    self.voters.inject([]) do |memo, voter|
      ballot = voter.ballots.find_by(list: self)
      memo << { id: voter.id, ballot_id: ballot.id, username: voter.username }
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

  def get_album_reviews(id)
    reviews = self.votes.select {|vote| vote.album_id == id && vote.review != "" }
    reviews.inject([]) do |memo, vote|
      memo << {review: vote.review, username: vote.ballot.voter.username, ballot_id: vote.ballot.id}
    end
  end

  def reviews
    reviews = self.votes.select { |vote| vote.review != "" }
    new_reviews = reviews.inject([]) do |memo, vote|
      memo << {review: vote.review, created_at: vote.updated_at, username: vote.ballot.voter.username, ballot_id: vote.ballot.id, artist: vote.discog.artist, title: vote.discog.title }
    end
    new_reviews
  end

end
