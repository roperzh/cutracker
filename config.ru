require "bundler"
require "dotenv"
require "ejs"
require "sass"
require "sprockets"

rack_env = ENV.fetch("RACK_ENV", "development").to_sym

Dotenv.load ".env.#{rack_env}", ".env"

map "/assets" do
  env = Sprockets::Environment.new
  env.append_path "assets/javascripts"
  env.append_path "assets/stylesheets"
  env.append_path "assets/bower_components"
  env.append_path "assets/images"

  run env
end

require "./app"
map "/" do
  run Cuba
end
