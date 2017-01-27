class VotesController < ApplicationController

  include BallotsHelper

  def create
    @ballot = Ballot.find(params[:ballot_id])
    @vote = Vote.new(ballot: @ballot, album_id: params[:album_id])

    if @ballot.votes.empty?
      @vote.rank = 1
    else
      @vote.rank = (@ballot.votes.order("rank ASC").last.rank
 + 1)
    end

    if @vote.save
      render json: { rank: @vote.rank, album_data: get_album_data(@vote.album_id) }
    else
      render json: { errors: @vote.errors.full_messages }, status: 422
    end

  end

  protected

    def vote_params
      params.require(:ballot).permits(:album_id, :rank, :ballot_id)
    end

end
