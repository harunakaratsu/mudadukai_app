require 'rails_helper'

RSpec.describe 'Searches', type: :request do
  describe 'POST /search_name_and_price' do
    it 'statusが200であること' do
      post search_name_and_price_path, params: { jan_code: 4902102072618 }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['name']).to eq('コカ・コーラ ')
      expect(JSON.parse(response.body)['price']).to eq(98)
      expect(JSON.parse(response.body)['amount']).to eq('500ml')
    end
  end
end
