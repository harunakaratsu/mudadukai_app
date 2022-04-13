class TargetValuesController < ApplicationController
  before_action :set_target_value, only: %i[update destroy]

  def index
    target_values = current_user.target_values
    render json: target_values, status: :ok
  end

  def create
    target_value = current_user.target_values.new(target_value_params)

    if target_value.save
      render json: target_value, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def update
    if @target_value.update(target_value_params)
      render json: @target_value, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def destroy
    @target_value.destroy!
    render json: @target_value, status: :ok
  end

  private

  def target_value_params
    params.require(:target_value).permit(:price, :calorie, :year_month)
  end

  def set_target_value
    @target_value = current_user.target_values.find(params[:id])
  end
end
