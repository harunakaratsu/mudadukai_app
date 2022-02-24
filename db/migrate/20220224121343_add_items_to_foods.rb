class AddItemsToFoods < ActiveRecord::Migration[6.1]
  def change
    add_column :foods, :place, :string
    add_column :foods, :memo, :text
  end
end
