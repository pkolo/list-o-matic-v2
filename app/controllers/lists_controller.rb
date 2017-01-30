class ListsController < ApplicationController

  before_action :authenticate_user!, except: [:index, :show]

  def index
    @open_lists = List.where(open: true)
    @closed_lists = List.where(open: false)
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

  def close_list
    @list = List.find(params[:list_id])
    if @list.owner == current_user
      @list.open = false
      @list.save
      redirect_to @list
    else
      render json: {error: "unauthorized"}
    end
  end

  protected

    def list_params
      params.require(:list).permit(:title, :maximum)
    end

end
