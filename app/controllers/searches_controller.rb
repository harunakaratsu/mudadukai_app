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

    name = doc.css('h5#gname').text.strip
    doc.search(:span).map(&:remove)
    company = doc.xpath('//td[@class="goodsval"][@colspan="2"]')[2].text.strip.gsub(/日本/, '')
    amount = doc.xpath('//td[@class="goodsval"][@colspan="2"]')[3].text.strip
    price = doc.xpath('//td[@class="goodsval"][@colspan="2"]')[4].text.strip.gsub(/\\/, '')
    # 定価の表示がなかったら平均価格を代入する
    if price == ''
      price = doc.xpath('//td[@colspan="9"]').text.gsub(/[\r\n]| |　|平均|：|\\/, '')
    end

    if doc.title != ' 商品紹介ページ'
      # priceの値が空の場合、yahooのapiで検索し直す
      if price == ''
        uri = URI.parse("https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=#{ENV['YAHOO_CLIENT_ID']}&jan_code=#{jan_code}")
        res = Net::HTTP.get_response(uri)
        food = JSON.parse(res.body.force_encoding('UTF-8'))['hits'].select { |x| x['point']['amount'] == 1 }
        price = food[0] && food[0]['price']
      end

      render json: { name: name, price: price, amount: amount, company: company }
    else
      render json: {}
    end
  end

  def search_calorie
    # jan_codeで検索
    jan_code = params[:jan_code]
    jan_uri = URI.parse("https://www.eatsmart.jp/s/do/caloriecheck/list?searchCategoryKbn=02&searchCategoryKbn=&searchKey=#{jan_code}&searchKey=")
    jan_html = URI.open(jan_uri, { 'User-Agent' => 'ruby' }).read
    jan_doc = Nokogiri::HTML.parse(jan_html)

    # search_wordで検索
    search_word = URI.encode_www_form({ 'q': params[:search_word] })
    word_uri = URI.parse("https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/search?#{search_word}")
    word_html = URI.open(word_uri).read
    word_doc = Nokogiri::HTML.parse(word_html)
    word_doc.search(:a).map(&:remove)

    amount = params[:amount]

    if jan_doc.xpath('//em').text != ''
      str = jan_doc.xpath('//p[@class="supp"]').text
      calorie = jan_doc.xpath('//em').text
    elsif word_doc.at_xpath('//div[@class="smallText greyText greyLink"]')
      str = word_doc.at_xpath('//div[@class="smallText greyText greyLink"]').text.gsub(/[\r\n]| |　|\t/, '').sub(/kcal.*/m, '')
      remove_str = str.slice(str.split('').index { |b| b == '1' }..str.split('').index { |b| b == ':' })
      calorie = str.gsub(remove_str, '')
    else
      render json: {}
      return
    end

    if amount.include?('ml') && str.include?('100ml') # 100mlあたりxxkcalの場合
      amount = amount.delete('^0-9').to_i / 100.to_f
      calorie = (calorie.to_i * amount).round
    elsif amount.include?('個') && str.include?('1個') # 1個あたりのカロリーの場合
      amount = amount.delete('^0-9').to_i
      calorie = calorie.to_i * amount
    elsif amount.include?('枚') && str.include?('1枚') # 1枚あたりのカロリーの場合
      amount = amount.delete('^0-9').to_i
      calorie = calorie.to_i * amount
    end

    render json: { calorie: calorie }
  end

  private

  def search_params
    params.require(:search).permit(:jan_code, :search_word, :amount)
  end
end
