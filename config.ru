require "bundler"
require "dotenv"
require "ejs"
require "sprockets"
require "sass"

rack_env = ENV.fetch("RACK_ENV", "development").to_sym

Dotenv.load ".env.#{rack_env}", ".env"


map "/assets" do
  env = Sprockets::Environment.new
  env.append_path "app/assets/javascripts"
  env.append_path "app/assets/stylesheets"
  env.append_path "app/assets/images"
  env.append_path "app/assets/fonts"

  env.context_class.class_eval do
    def asset_path(path, options = {})
      "/assets/#{path}"
    end
  end

  run env
end

require "./app"
map "/" do
  run Cuba
end
