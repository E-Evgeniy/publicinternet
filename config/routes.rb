# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'react#home'
  get '/api/places', to: 'api/places#index'
  get '*path', to: 'react#home'
end
