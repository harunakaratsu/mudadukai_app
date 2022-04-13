class User < ApplicationRecord
  has_many :foods, dependent: :destroy
  has_many :target_values, dependent: :destroy

  validates :line_user_id, presence: true, uniqueness: true

  def favorites
    foods.where(favorite: true)
  end

  def this_month_foods
    foods.where(created_at: Time.now.beginning_of_month...Time.now.end_of_month)
  end

  def this_month_target_value
    target_values.find_by(year_month: Time.now.strftime('%Y%m'))
  end

  def over_target_value?(num = 1)
    this_month_foods.sum(:price) > this_month_target_value.price * num \
    || this_month_foods.sum(:calorie) > this_month_target_value.calorie * num
  end
end
