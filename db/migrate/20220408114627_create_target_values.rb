class CreateTargetValues < ActiveRecord::Migration[6.1]
  def change
    create_table :target_values do |t|
      t.integer :price, null: false, default: 0
      t.integer :calorie, null: false, default: 0
      t.references :user, null: false, foreign_key: true
      t.string :year_month, null: false

      t.timestamps
      t.index [:user_id, :year_month], unique: true
    end
  end
end
