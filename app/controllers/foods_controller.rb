class FoodsController < ApplicationController
  before_action :set_food, only: %i[update destroy]

  def index
    foods = current_user.foods
    render json: foods, status: :ok
  end

  def create
    food = current_user.foods.new(food_params)

    if food.save
      notification
      render json: food, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def update
    if @food.update(food_params)
      notification
      render json: @food, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def destroy
    @food.destroy!
    render json: @food, status: :ok
  end

  def favorite_foods
    favorite_foods = current_user.favorites
    render json: favorite_foods, status: :ok
  end

  private

  def food_params
    params.require(:food).permit(:name, :price, :calorie, :created_at, :place, :memo, :favorite, :amount, :unit)
  end

  def set_food
    @food = current_user.foods.find(params[:id])
  end
end
