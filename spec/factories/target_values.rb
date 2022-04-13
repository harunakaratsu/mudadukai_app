FactoryBot.define do
  factory :target_value do
    price { 1000 }
    calorie { 1000 }
    year_month { 'year_month' }
    association :user
  end
end
