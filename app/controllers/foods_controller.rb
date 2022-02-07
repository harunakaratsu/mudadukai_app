class FoodsController < ApplicationController
  def create
    user = User.find(session[:user_id])
    food = user.foods.new(food_params)

    if food.save
      render json: food, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  private

  def food_params
    params.require(:food).permit(:name, :price, :calorie)
  end
end
