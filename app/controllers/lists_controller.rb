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
    if !@list.open
      @list_data = @list.list_to_json
    end
  end

  def edit
    @list = List.find(params[:id])
    redirect_to @list unless current_user == @list.owner
  end

  def close_list
    @list = List.find(params[:list_id])
    if @list.owner == current_user
      @list.open = false
      @list.save
      redirect_to @list
    else
      redirect_to @list
    end
  end

  protected

    def list_params
      params.require(:list).permit(:title, :maximum, :minimum)
    end

end
