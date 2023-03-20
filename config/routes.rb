# frozen_string_literal: true

Rails.application.routes.draw do
  get '/api/places', to: 'api/places#index'
  get '*path', to: 'react#home'
end
