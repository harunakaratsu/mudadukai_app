require 'rails_helper'

RSpec.describe User, type: :model do
  context '全てのフィールドが有効な場合' do
    it '有効であること' do
      user = build(:user)
      expect(user).to  be_valid
    end
  end

  context 'line_user_idがnillの場合' do
    it '無効であること' do
      user = build(:user, line_user_id: nil)
      expect(user).to  be_invalid
    end
  end

  context 'line_user_idがすでに存在する場合' do
    let(:user) { create(:user) }
    it '無効であること' do
      same_user = build(:user, line_user_id: user.line_user_id)
      expect(same_user).to  be_invalid
    end
  end
end
