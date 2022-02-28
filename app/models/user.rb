class User < ApplicationRecord
  has_many :foods, dependent: :destroy
  validates :line_user_id, presence: true, uniqueness: true

  def favorites
    foods.where(favorite: true)
  end
end
