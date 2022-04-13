class TargetValue < ApplicationRecord
  belongs_to :user

  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :calorie, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :year_month, presence: true
  validates :user_id, uniqueness: { scope: :year_month }
end
