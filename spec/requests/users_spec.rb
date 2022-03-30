require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'POST /users' do
    it 'statusが200であること' do
      post users_path, params: { idToken: 'idToken' }
      expect(response.status).to eq(200)
    end
  end
end
