namespace :push_line do
  desc '1週間ごとの通知'
  task push_line_message_week: :environment do
    users = User.all
    users.each do |user|
      message = {
        "type": "flex",
        "altText": "先週の無駄遣い",
        "contents": {
          "type": "bubble",
          "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "先週の無駄遣い",
                "weight": "bold",
                "color": "#4A5568",
                "align": "center"
              }
            ],
            "backgroundColor": "#FED7D7"
          },
          "hero": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://1.bp.blogspot.com/-41u0_S90Ppg/U8XkAkPE-gI/AAAAAAAAipE/hIYV_yYIwKA/s800/animal_pig_buta.png",
                "margin": "xxl"
              }
            ],
            "backgroundColor": "#FED7D7"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "使った金額",
                "color": "#4A5568"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "#{user.foods.where(created_at: Time.current.prev_week...Time.current.prev_week(:sunday).end_of_day).sum(:price)}",
                    "color": "#4A5568",
                    "offsetStart": "xxl",
                    "size": "xl"
                  },
                  {
                    "type": "text",
                    "text": "円",
                    "align": "end",
                    "offsetEnd": "xxl",
                    "color": "#4A5568"
                  }
                ],
                "backgroundColor": "#ffffff",
                "cornerRadius": "md",
                "margin": "md",
                "borderWidth": "bold",
                "paddingAll": "sm"
              },
              {
                "type": "text",
                "text": "摂取カロリー",
                "margin": "xl",
                "color": "#4A5568"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "#{user.foods.where(created_at: Time.current.prev_week...Time.current.prev_week(:sunday).end_of_day).sum(:calorie)}",
                    "size": "xl",
                    "color": "#4A5568",
                    "offsetStart": "xxl"
                  },
                  {
                    "type": "text",
                    "text": "kcal",
                    "align": "end",
                    "offsetEnd": "xxl",
                    "color": "#4A5568"
                  }
                ],
                "backgroundColor": "#ffffff",
                "cornerRadius": "md",
                "margin": "md",
                "borderWidth": "bold",
                "paddingAll": "sm"
              }
            ],
            "backgroundColor": "#FED7D7"
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "詳細を見る",
                  "uri": "https://mudadukai-app.herokuapp.com"
                }
              }
            ],
            "backgroundColor": "#FED7D7"
          }
        }
      }
      client = Line::Bot::Client.new { |config|
        config.channel_secret = ENV['LIFF_CHANNEL_SECRET']
        config.channel_token = ENV['LIFF_CHANNEL_ACCESS_TOKEN']
      }
      response = client.push_message(user.line_user_id, message)
      p response
    end
  end

  desc '1ヶ月ごとの通知'
  task push_line_message_month: :environment do
    users = User.all
    users.each do |user|
      message = {
        "type": "flex",
        "altText": "先月の無駄遣い",
        "contents": {
          "type": "bubble",
          "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "前月の無駄遣い",
                "weight": "bold",
                "color": "#4A5568",
                "align": "center"
              }
            ],
            "backgroundColor": "#FED7D7"
          },
          "hero": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://1.bp.blogspot.com/-41u0_S90Ppg/U8XkAkPE-gI/AAAAAAAAipE/hIYV_yYIwKA/s800/animal_pig_buta.png",
                "margin": "xxl"
              }
            ],
            "backgroundColor": "#FED7D7"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "使った金額",
                "color": "#4A5568"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "#{user.foods.where(created_at: Time.current.last_month.beginning_of_month...Time.current.last_month.end_of_month).sum(:price)}",
                    "color": "#4A5568",
                    "offsetStart": "xxl",
                    "size": "xl"
                  },
                  {
                    "type": "text",
                    "text": "円",
                    "align": "end",
                    "offsetEnd": "xxl",
                    "color": "#4A5568"
                  }
                ],
                "backgroundColor": "#ffffff",
                "cornerRadius": "md",
                "margin": "md",
                "borderWidth": "bold",
                "paddingAll": "sm"
              },
              {
                "type": "text",
                "text": "摂取カロリー",
                "margin": "xl",
                "color": "#4A5568"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "#{user.foods.where(created_at: Time.current.last_month.beginning_of_month...Time.current.last_month.end_of_month).sum(:calorie)}",
                    "size": "xl",
                    "color": "#4A5568",
                    "offsetStart": "xxl"
                  },
                  {
                    "type": "text",
                    "text": "kcal",
                    "align": "end",
                    "offsetEnd": "xxl",
                    "color": "#4A5568"
                  }
                ],
                "backgroundColor": "#ffffff",
                "cornerRadius": "md",
                "margin": "md",
                "borderWidth": "bold",
                "paddingAll": "sm"
              }
            ],
            "backgroundColor": "#FED7D7"
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "詳細を見る",
                  "uri": "https://mudadukai-app.herokuapp.com"
                }
              }
            ],
            "backgroundColor": "#FED7D7"
          }
        }
      }
      client = Line::Bot::Client.new { |config|
        config.channel_secret = ENV['LIFF_CHANNEL_SECRET']
        config.channel_token = ENV['LIFF_CHANNEL_ACCESS_TOKEN']
      }
      response = client.push_message(user.line_user_id, message)
      p response
    end
  end
end

