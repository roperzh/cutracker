require "bundler"
require "dotenv"
require "sprockets"

rack_env = ENV.fetch("RACK_ENV", "development").to_sym

Dotenv.load ".env.#{rack_env}", ".env"

map "/assets" do
  env = Sprockets::Environment.new

  %w[javascripts stylesheets images].each do |path|
    env.append_path "app/assets/#{path}"
  end

  env.context_class.class_eval do
    def asset_path(path, options = {})
      "/assets/#{path}"
    end
  end

  env.cache = {}

  run env
end

require "./app"
run Cuba
