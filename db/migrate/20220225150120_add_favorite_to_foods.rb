class AddFavoriteToFoods < ActiveRecord::Migration[6.1]
  def change
    add_column :foods, :favorite, :boolean, null: false, default: false
  end
end
