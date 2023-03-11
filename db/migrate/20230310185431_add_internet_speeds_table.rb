class AddInternetSpeedsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :internet_speeds do |t|
      t.references :place, null: false, foregin_key: true, index: true
      t.float :download_speed, null: false, scale: 2, precision: 15 #25.55 mbps
      t.string :download_units, null: false

      #This adds in created_at and updated_at
      t.timestamps
    end
  end
end
