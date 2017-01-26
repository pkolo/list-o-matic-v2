class BallotsController < ApplicationController
  skip_before_action :verify_authenticity_token

  include BallotsHelper

  def create
    @ballot = Ballot.new
  end

  def show
  end

  def discog_search
    results = album_search(params)
    render json: results
  end

end
