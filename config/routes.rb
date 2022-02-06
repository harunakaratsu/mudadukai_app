Rails.application.routes.draw do
  resources :users, only: %i[create]
  resources :foods, only: %i[create]

  def fallback_index_html
    render :file => 'public/index.html'
  end
end
