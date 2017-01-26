Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :ballots, only: [:new] do
    resources :votes, only: [:create]
  end

  post '/discog_search', to: 'ballots#discog_search'

end
