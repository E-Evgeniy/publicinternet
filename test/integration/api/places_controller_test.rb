require "test_helper"

module Api
  class PlacesControllerTest < ActiveSupport::TestCase
    test 'answers places the match search term if set' do
      place = FactoryBot.create(:place)
      bindig.break
      get "/api/places?search="
      
      parsed_body = JSON.parse(response.body)
      bindig.break
    end

    test 'answers all places if search term is empty' do
      assert false
    end
  end
end
