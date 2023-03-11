Rails.application.routes.draw do
  root "places#index"
  get "/api/places", to: "api/places#index"
end
