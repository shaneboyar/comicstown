require 'sidekiq/web'

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#root'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :publishers, :series, :issues, :writers, :artists
  get "/about" => "static_pages#about"
  get "/privacy" => "static_pages#privacy"
  get "/terms" => "static_pages#terms"

  namespace :admin do
    get "/", to: 'admin#root', as: 'root'
    mount Searchjoy::Engine, at: 'searchjoy'
    mount Sidekiq::Web, at: 'sidekiq'
    namespace :merchandising do
      resources :comic_scrollers
      resources :issues
    end
  end

  # API Routes
  namespace :api do
    namespace :v1 do
      namespace :issues do
        get "/", action: 'index', as: 'index'
        get "/search", action: 'search', as: 'search'
        get "/scroller", action: 'scroller', as: 'scroller'
      end
      namespace :tags do
        post "/", action: 'create', as: 'create'
        delete "/", action: 'destroy', as: 'destroy'
      end
    end
  end

end
