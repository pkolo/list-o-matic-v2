class BallotsController < ApplicationController
  skip_before_action :verify_authenticity_token

  include BallotsHelper

  def create
    @ballot = Ballot.new
    @ballot.list = List.find(params[:list_id].to_i)
    @ballot.voter = current_user
    @ballot.save
    redirect_to @ballot
  end

  def show
    @ballot = Ballot.find(params[:id])
    @votes = @ballot.votes.map { |vote| { rank: vote.rank, album_data: get_album_data(vote.album_id) }}
    render component: 'Ballot', props: { ballot: @ballot, votes: @votes.sort_by { |vote| vote[:rank]} }
  end

  def discog_search
    results = album_search(params)
    render json: results
  end

  def album_info
    results = get_album_data(params[:album_id])
    render json: results
  end

end
