require 'rails_helper'

RSpec.describe Food, type: :model do
  context "全てのフィールドが有効な場合" do
    it '有効であること' do 
      food = build(:food)
      expect(food).to  be_valid
    end
  end

  context "名前が存在しない場合" do
    it '無効であること' do
      food = build(:food, name: '')
      expect(food).to  be_invalid
    end
  end

  context "名前が50文字以上である場合" do
    it '無効であること' do
      food = build(:food, name: 'a' * 51)
      expect(food).to  be_invalid
    end
  end

  context "金額が存在しない場合" do
    it '無効であること' do
      food = build(:food, price: nil)
      expect(food).to  be_invalid
    end
  end

  context "金額が0以下である場合" do
    it '無効であること' do
      food = build(:food, price: 0)
      expect(food).to  be_invalid
    end
  end

  context "カロリーが存在しない場合" do
    it '無効であること' do
      food = build(:food, calorie: nil)
      expect(food).to  be_invalid
    end
  end

  context "カロリーが0以下である場合" do
    it '無効であること' do
      food = build(:food, calorie: 0)
      expect(food).to  be_invalid
    end
  end

  context "ユーザーが存在しない場合" do
    it '無効であること' do
      food = build(:food, user_id: nil)
      expect(food).to  be_invalid
    end
  end
end
