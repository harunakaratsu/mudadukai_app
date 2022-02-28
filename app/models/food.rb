class Food < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 50 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :calorie, presence: true, numericality: { greater_than: 0 }
  validates :place, length: { maximum: 255 }
  validates :memo, length: { maximum: 65_535 }
  validates :favorite, inclusion: [true, false]
end
