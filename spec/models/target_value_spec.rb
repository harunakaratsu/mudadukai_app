require 'rails_helper'

RSpec.describe TargetValue, type: :model do
  context '全てのフィールドが有効であること' do
    it '有効であること' do
      target_value = build(:target_value)
      expect(target_value).to be_valid
    end
  end

  context 'priceが存在しない場合' do
    it '無効であること' do
      target_value = build(:target_value, price: nil)
      expect(target_value).to be_invalid
    end
  end

  context 'priceが0より下である場合' do
    it '無効であること' do
      target_value = build(:target_value, price: -1)
      expect(target_value).to be_invalid
    end
  end

  context 'calorieが存在しない場合' do
    it '無効であること' do
      target_value = build(:target_value, calorie: nil)
      expect(target_value).to be_invalid
    end
  end

  context 'calorieが0より下である場合' do
    it '無効であること' do
      target_value = build(:target_value, calorie: -1)
      expect(target_value).to be_invalid
    end
  end

  context 'year_monthが存在しない場合' do
    it '無効であること' do
      target_value = build(:target_value, year_month: nil)
      expect(target_value).to be_invalid
    end
  end

  context 'year_monthがすでに存在する場合' do
    let(:target_value) { create(:target_value) }
    it '無効であること' do
      same_target_value = build(:target_value, user_id: target_value.user_id, year_month: target_value.year_month)
      expect(same_target_value).to be_invalid
    end
  end
  
  context 'ユーザーが削除された場合' do
    it 'target_valueも削除されること' do
      target_value = build(:target_value)
      target_value.user.destroy
      expect(TargetValue.count).to eq 0
    end
  end
end
