# frozen_string_literal: true

Place.create(name: 'Starbucks', address: 'Bavarskya st', city: 'New York')
InternetSpeed.create(place_id: 1, download_speed: 25, download_units: 'mbps')

Place.create(name: 'Macd', address: 'Sov st', city: 'Mexico')
InternetSpeed.create(place_id: 2, download_speed: 10, download_units: 'mbps')