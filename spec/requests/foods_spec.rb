require 'rails_helper'

RSpec.describe 'Foods', type: :request do
  let(:food) { create(:food) }

  before do
    allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return({ user_id: food.user_id })
  end

  describe 'GET /foods' do
    it 'statusが200であること' do
      get foods_path
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /foods' do
    it 'statusが201であること' do
      post foods_path, params: { food: { name: 'Food', price: 100, calorie: 100 } }
      expect(response).to have_http_status(201)
      expect(Food.count).to  eq 2
      expect(JSON.parse(response.body)['name']).to eq('Food')
      expect(JSON.parse(response.body)['price']).to eq(100)
      expect(JSON.parse(response.body)['calorie']).to eq(100)
    end
  end

  describe 'PUT /food/:id' do
    it 'statusが200であること' do
      put food_path(food.id), params: { food: { name: 'updateFood', price: 200, calorie: 200 } }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['name']).to eq('updateFood')
      expect(JSON.parse(response.body)['price']).to eq(200)
      expect(JSON.parse(response.body)['calorie']).to eq(200)
    end
  end

  describe 'DELETE /food/:id' do
    it 'statusが200であること' do
      delete food_path(food.id)
      expect(response).to have_http_status(200)
      expect(Food.count).to  eq 0
    end
  end

  describe 'GET /foods/favorite_foods' do
    it 'statusが200であること' do
      get favorite_foods_foods_path
      expect(response).to have_http_status(200)
    end
  end
end
