require 'rails_helper'

RSpec.describe 'TargetValues', type: :request do
  let(:target_value) { create(:target_value) }

  before do
    allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return({ user_id: target_value.user_id })
  end

  describe 'GET /target_values' do
    it 'statusが200であること' do
      get target_values_path
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /target_values' do
    it 'statusが201であること' do
      post target_values_path, params: { target_value: { price: 1000, calorie: 1000, year_month: 'another_year_month' } }
      expect(response).to have_http_status(201)
      expect(TargetValue.count).to  eq 2
      expect(JSON.parse(response.body)['price']).to eq(1000)
      expect(JSON.parse(response.body)['calorie']).to eq(1000)
      expect(JSON.parse(response.body)['year_month']).to eq('another_year_month')
    end
  end

  describe 'PUT /target_values/:id' do
    it 'statusが200であること' do
      put target_value_path(target_value.id), params: { target_value: { price: 2000, calorie: 2000 } }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['price']).to eq(2000)
      expect(JSON.parse(response.body)['calorie']).to eq(2000)
    end
  end

  describe 'DELETE /target_values/:id' do
    it 'statusが200であること' do
      delete target_value_path(target_value.id)
      expect(response).to have_http_status(200)
      expect(TargetValue.count).to  eq 0
    end
  end
end
