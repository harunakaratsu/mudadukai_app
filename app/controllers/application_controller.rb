class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end

  def push_message(text, user)
    message = {
      'type': 'text',
      'text': text
    }
    client = Line::Bot::Client.new { |config|
      config.channel_secret = ENV['LIFF_CHANNEL_SECRET']
      config.channel_token = ENV['LIFF_CHANNEL_ACCESS_TOKEN']
    }
    client.push_message(user.line_user_id, message)
  end

  def notification
    if current_user.this_month_target_value
      if current_user.over_target_value?
        text = '無駄遣いが目標値を超えました！もう無駄遣いはやめましょう！'
        push_message(text, current_user)
      elsif current_user.over_target_value?(0.8)
        text = '無駄遣いが目標値の80%を超えました！無駄遣いを控えましょう！'
        push_message(text, current_user)
      end
    end
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
