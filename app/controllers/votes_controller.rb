class VotesController < ApplicationController

  include BallotsHelper

  def create
    album_data = get_album_data(params[:album_id])
    discog = Discog.find_or_create_by(album_id: params[:album_id], year: album_data["year"], title: album_data["title"], artist: album_data["artists"][0]["name"], label: album_data["labels"][0]["name"])

    discog.img_url = album_data["images"][0]["uri"] if album_data["images"]
    discog.video_url = album_data["videos"][0]["uri"] if album_data["videos"]

    discog.save

    @ballot = Ballot.find(params[:ballot_id])
    @vote = Vote.new(ballot: @ballot, album_id: params[:album_id])
    @vote.rank = @ballot.votes.length + 1

    if @vote.save
      render json: { rank: @vote.rank, id: @vote.id, album_data: discog }
    else
      render json: { errors: @vote.errors.full_messages }, status: 422
    end

  end

  def destroy
    vote = Vote.find(params[:id])
    vote.destroy
    render json: {message: "destroyed!"}
  end

end
