class FoodsController < ApplicationController
  before_action :set_user, only: %i[index create update destroy]
  before_action :set_food, only: %i[update destroy]

  def index
    foods = @user.foods
    render json: foods, status: :ok
  end

  def create
    food = @user.foods.new(food_params)

    if food.save
      message = [
        {
          type: 'text',
          text: '以下の内容で記録しました。'
        },
        {
          type: 'text',
          text: "名前： #{params[:name]}\n金額： #{params[:price]}円\nカロリー： #{params[:calorie]}kcal"
        },
        {
          type: 'sticker',
          packageId: 11537,
          stickerId: 52002739
        }
      ]
      client = Line::Bot::Client.new { |config|
        config.channel_secret = ENV['LIFF_CHANNEL_SECRET']
        config.channel_token = ENV['LIFF_CHANNEL_ACCESS_TOKEN']
      }
      response = client.push_message(@user.line_user_id, message)
      p response
      render json: food, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def update
    if @food.update(food_params)
      render json: @food, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def destroy
    @food.destroy!
    render json: @food, status: :ok
  end

  private

  def food_params
    params.require(:food).permit(:name, :price, :calorie, :created_at)
  end

  def set_user
    @user = User.find(session[:user_id])
  end

  def set_food
    @food = @user.foods.find(params[:id])
  end
end
