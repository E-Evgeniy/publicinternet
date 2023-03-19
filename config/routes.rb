Rails.application.routes.draw do
  root 'places#index'
  get '/api/places', to: 'api/places#index'
  get '/new-internet-speed', to: 'places#index'
end
