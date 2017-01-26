class BallotsController < ApplicationController
  skip_before_action :verify_authenticity_token

  include BallotsHelper

  def create
    @ballot = Ballot.new
    @ballot.list = List.find(params[:list_id].to_i)
    @ballot.save
    redirect_to @ballot
  end

  def show
    @ballot = Ballot.find(params[:id])
  end

  def discog_search
    results = album_search(params)
    render json: results
  end

end
