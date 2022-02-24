FactoryBot.define do
  factory :food do
    name { "Food" }
    price { 100 }
    calorie { 100 }
    place { "place" }
    memo { "memo" }
    association :user
  end
end
