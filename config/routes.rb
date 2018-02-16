Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#root'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :publishers, :series, :issues, :writers, :artists
  get "/about" => "static_pages#about"
  get "/privacy" => "static_pages#privacy"
  get "/terms" => "static_pages#terms"

  # Searchjoy Dashboard
  authenticate :user, -> (user) { user.admin? } do
    mount Searchjoy::Engine, at: "searchjoy"
  end

  # API Routes
  namespace :api do
    namespace :v1 do
      namespace :issues do
        get "/", action: 'index', as: 'index'
        get "/search", action: 'search', as: 'search'
        get "/new-releases", action: 'new_releases', as: 'new_releases'
      end
    end
  end

end
