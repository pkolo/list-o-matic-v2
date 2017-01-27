Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    get '/register', to: 'devise/registrations#new'
    get '/login', to: 'devise/sessions#new'
    get '/logout', to: 'devise/sessions#destroy'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'lists#index'

  resources :lists, only: [:new, :create, :show, :index]

  resources :ballots, only: [:new, :create, :show] do
    resources :votes, only: [:create]
  end

  post '/ballots/:ballot_id/sort_votes', to: 'ballots#sort_votes'
  post '/discog_search', to: 'ballots#discog_search'
  post '/album_info', to: 'ballots#album_info'

end
