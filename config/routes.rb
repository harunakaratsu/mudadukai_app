Rails.application.routes.draw do
  resources :users, only: %i[create]
  resources :foods, only: %i[create]
end
