# frozen_string_literal: true

# Controller the API for processing request create internet_speed
module Api
  # InternetSpeedController
  class InternetSpeedController < BaseController
    def create
      place = Place.create!(
        name: params[:place_name],
        city: params[:place_city],
        address: params[:place_address]
      )

      speed = InternetSpeed.create!(
        place: place,
        download_speed: params[:download_speed],
        download_units: params[:download_units]
      )

      render(json: { }, status: :created) # Return 201 to client
    end
  end
end
