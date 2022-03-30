class AddAmountToFoods < ActiveRecord::Migration[6.1]
  def change
    add_column :foods, :amount, :integer
    add_column :foods, :unit, :string
  end
end
