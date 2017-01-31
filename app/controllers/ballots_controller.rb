class BallotsController < ApplicationController
  skip_before_action :verify_authenticity_token

  include BallotsHelper

  def create
    binding.pry
    @ballot = Ballot.new
    @ballot.list = List.find(params[:list_id].to_i)
    @ballot.voter = current_user
    @ballot.save
    redirect_to @ballot
  end

  def show
    @ballot = Ballot.find(params[:id])
    @votes = @ballot.votes.map { |vote| { rank: vote.rank, id: vote.id, album_data: get_album_data(vote.album_id) }}
    if @ballot.voter == current_user
      render component: 'Ballot', props: { ballot: @ballot, votes: @votes, list: @ballot.list }
    else
      render component: 'StaticBallot', props: { user: @ballot.voter.username, votes: @votes, list: @ballot.list }
    end
  end

  def discog_search
    list = Ballot.find(params[:ballot_id]).list
    results = album_search(params)
    album_ids = results["results"].map {|result| result["id"]}
    match = album_ids & list.votes.pluck(:album_id)
    render json: {match: match, results: results}
  end

  def album_info
    results = get_album_data(params[:album_id])
    render json: results
  end

  def sort_votes
    @ballot = Ballot.find(params[:ballot_id])
    params[:vote].each_with_index do |id, index|
      Vote.find(id).update_attribute(:rank, index+1)
    end
    @votes = @ballot.votes.map { |vote| { rank: vote.rank, id: vote.id, album_data: get_album_data(vote.album_id) }}
    render json: @votes
  end

end
