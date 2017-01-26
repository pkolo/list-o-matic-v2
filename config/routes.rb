Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'lists#index'

  resources :lists, only: [:new, :create, :show, :index]

  resources :ballots, only: [:new, :create, :show] do
    resources :votes, only: [:create]
  end

  post '/discog_search', to: 'ballots#discog_search'
  post '/album_info', to: 'ballots#album_info'

end
