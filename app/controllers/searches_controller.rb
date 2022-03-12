class SearchesController < ApplicationController
  require 'open-uri'
  require 'nokogiri'
  require 'net/http'
  require 'uri'

  def search_name_and_price
    jan_code = params[:jan_code]
    uri = URI.parse("https://www.janken.jp/goods/jk_catalog_syosai.php?jan=#{jan_code}")
    html = URI.open(uri).read
    doc = Nokogiri::HTML.parse(html)

    name = doc.css('h5#gname').inner_text.gsub(/[\r\n]| |　/, '')
    doc.search(:span).map(&:remove)
    price = doc.xpath('//td[@colspan="9"]').inner_text.gsub(/[\r\n]| |　|平均|：|\\/, '')
    amount = doc.xpath('//td[@class="goodsval"][@colspan="2"]')[3].text

    if doc.title != ' 商品紹介ページ'
      # priceの値が空の場合、yahooのapiで検索し直す
      if price == ''
        uri = URI.parse("https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=#{ENV['YAHOO_CLIENT_ID']}&jan_code=#{jan_code}")
        res = Net::HTTP.get_response(uri)
        food = JSON.parse(res.body.force_encoding('UTF-8'))['hits'].select { |x| x['point']['amount'] == 1 }
        price = food[0] && food[0]['price']
      end

      render json: { name: name, price: price, amount: amount }
    else
      render json: {}
    end
  end

  def search_calorie
    name = URI.encode_www_form({ 'q': params[:search_name] })
    uri = URI.parse("https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/search?#{name}")
    html = URI.open(uri).read
    doc = Nokogiri::HTML.parse(html)
    doc.search(:a).map(&:remove)

    if doc.at_xpath('//div[@class="smallText greyText greyLink"]')
      str = doc.at_xpath('//div[@class="smallText greyText greyLink"]')
               .text.gsub(/[\r\n]| |　|\t/, '')
               .sub(/kcal.*/m, '')
      remove_str = str.slice(str.split('').index { |b| b == '1' }..str.split('').index { |b| b == ':' })
      calorie = str.gsub(remove_str, '')
      amount = params[:amount]

      # 100mlあたりxxkcalの場合
      if amount.include?('ml') && str.include?('100mlあたり')
        amount = amount.delete('^0-9').to_i / 100.to_f
        calorie = calorie.to_i * amount.round
      end

      render json: { calorie: calorie }
    else
      render json: {}
    end
  end

  private

  def search_params
    params.require(:search).permit(:jan_code, :search_name, :amount)
  end
end
