require 'rails_helper'

RSpec.describe 'Searches', type: :request do
  describe 'POST /search_name_and_price' do
    it 'statusが200であること' do
      post search_name_and_price_path, params: { jan_code: 4902102072618 }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['name']).to eq('コカ・コーラ')
      expect(JSON.parse(response.body)['price']).to eq('98')
      expect(JSON.parse(response.body)['amount']).to eq('ペットボトル 500 ml')
      expect(JSON.parse(response.body)['company']).to eq('コカ・コーラ')
    end
  end

  describe 'POST /search_calorie' do
    it 'statusが200であること' do
      post search_calorie_path, params: { search_word: "コカ・コーラ コカ・コーラ", amount: 'ペットボトル 500 ml', jan_code: 4902102072618 }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['calorie']).to eq(225)
    end
  end
end
