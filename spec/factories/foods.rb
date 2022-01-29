FactoryBot.define do
  factory :food do
    name { "MyString" }
    price { 1 }
    calorie { 1 }
    user { nil }
  end
end
