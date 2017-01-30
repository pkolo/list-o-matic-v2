class ListsController < ApplicationController

  before_action :authenticate_user!, except: [:index, :show]

  def index
    @lists = List.all
  end

  def new
    @list = List.new
  end

  def create
    @list = List.new(list_params)
    @list.owner = current_user

    if @list.save
      redirect_to @list
    else
      render 'new'
    end
  end

  def show
    @list = List.find(params[:id])
    @list_data = @list.list_to_json
  end

  protected

    def list_params
      params.require(:list).permit(:title, :maximum)
    end

end
