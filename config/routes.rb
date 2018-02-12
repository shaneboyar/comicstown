Rails.application.routes.draw do
  get "/about" => "static_pages#about"

  get "/privacy" => "static_pages#privacy"

  get "/terms" => "static_pages#terms"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'issues#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :publishers, :series, :issues, :writers, :artists
end
