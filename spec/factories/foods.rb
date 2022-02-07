FactoryBot.define do
  factory :food do
    name { "Food" }
    price { 100 }
    calorie { 100 }
    association :user
  end
end
