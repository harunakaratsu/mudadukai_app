Rails.application.routes.draw do
  resources :users, only: %i[create]
  resources :foods, only: %i[index create update destroy] do
    collection do
      get :favorite_foods
    end
  end
  resources :target_values, only: %i[index create update destroy]
  post 'search_name_and_price', to: 'searches#search_name_and_price'
  post 'search_calorie', to: 'searches#search_calorie'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
