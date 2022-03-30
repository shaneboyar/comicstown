source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 4.3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Webpack
gem 'webpacker', '~> 3.2'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
gem 'rack-cors', :require => 'rack/cors'
# Easy User Management
gem 'devise'
gem 'omniauth-facebook'

# Elasticsearch / Searchkick / Searchjoy
gem 'searchkick'
gem 'searchjoy'

# Add Google Materialize Styles
gem 'jquery-rails'
gem 'materialize-sass'

# Add Pagination TODO: Will probably want to use this later
gem 'will_paginate-materialize'

# Editing/Organizing comics
gem 'acts-as-taggable-on', git: 'https://github.com/mbleigh/acts-as-taggable-on'

# SEO Gems
gem 'meta-tags'
gem 'sitemap_generator' # https://github.com/kjvarga/sitemap_generator
# gem 'friendly_id' # TODO: https://github.com/norman/friendly_id

# Jobs
gem 'sidekiq'
# gem 'whenever', require: false # https://github.com/javan/whenever

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  gem 'dotenv-rails'
  # Lorem Ipsum Generator
  gem 'faker', require: false
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'annotate'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
