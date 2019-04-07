Rails.application.routes.draw do
  root 'index#index'
  get 'index/index'
  get 'index/list'

  # For details on the DSL available within this ile, see http://guides.rubyonrails.org/routing.html
end
