# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'react#home'
  get '/api/places', to: 'api/places#index'
  post '/api/internet_speed', to: 'api/internet_speed#create'
  get '*path', to: 'react#home'
end
