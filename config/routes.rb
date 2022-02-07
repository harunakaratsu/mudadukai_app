Rails.application.routes.draw do
  resources :users, only: %i[create]
  resources :foods, only: %i[create]

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
