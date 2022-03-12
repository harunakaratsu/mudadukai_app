require 'rails_helper'

RSpec.describe "Searches", type: :request do
  describe "POST /search_name_and_price" do
    it "statusが200であること" do
      post search_name_and_price_path, params: { jan_code: 4902102072618 }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['name']).to eq('コカ・コーラ')
      expect(JSON.parse(response.body)['price']).to eq('140')
      expect(JSON.parse(response.body)['amount']).to eq("\r\n      ペットボトル 500 ml    ")
    end
  end

  describe "POST /search_calorie" do
    it "statusが200であること" do
      post search_calorie_path, params: { search_name: 'コカ・コーラ', amount: "\r\n      ペットボトル 500 ml    " }
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['calorie']).to eq(225)
    end
  end
end
