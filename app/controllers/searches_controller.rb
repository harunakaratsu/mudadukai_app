class SearchesController < ApplicationController
  require 'net/http'
  require 'uri'

  def search_name_and_price
    jan_code = params[:jan_code]
    uri = URI.parse("https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=#{ENV['YAHOO_CLIENT_ID']}&jan_code=#{jan_code}")
    res = Net::HTTP.get_response(uri)

    foods = JSON.parse(res.body.force_encoding('UTF-8'))['hits']
    food = foods.find { |x| !x['name'].include?('セット') && x['price'] < 500 }

    if food
      price = food['price']
      amount = food['name'].split(/ |　|入/).find { |x| x.include?('ml') || x.include?('ｇ') || x.include?('g') }
      name = food['name'].delete(" #{amount}").split('　')
      name = "#{name[0]} #{name[1]}"

      render json: { name: name, price: price, amount: amount }
    else
      render json: {}
    end
  end
end
