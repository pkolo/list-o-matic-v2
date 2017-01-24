class BallotsController < ApplicationController

  def new
    @ballot = Ballot.new
  end
  
end
