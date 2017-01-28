class VotesController < ApplicationController

  include BallotsHelper

  def create
    @ballot = Ballot.find(params[:ballot_id])
    @vote = Vote.new(ballot: @ballot, album_id: params[:album_id])
    @vote.rank = @ballot.votes.length + 1

    if @vote.save
      render json: { rank: @vote.rank, id: @vote.id, album_data: get_album_data(@vote.album_id) }
    else
      render json: { errors: @vote.errors.full_messages }, status: 422
    end

  end

  protected

    def vote_params
      params.require(:ballot).permits(:album_id, :rank, :ballot_id)
    end

end
