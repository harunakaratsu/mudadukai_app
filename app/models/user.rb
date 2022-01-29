class User < ApplicationRecord
  has_many :foods
  validates :line_user_id, presence: true
end
