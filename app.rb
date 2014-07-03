require "cuba"
require "cuba/render"
require "erb"
require "mongoid"
require "rack/protection"
require "shield"

Cuba.use Rack::Session::Cookie, key: ENV["APP_KEY"], secret: ENV["APP_SECRET"]
Cuba.use Rack::Protection::RemoteReferrer
Cuba.use Rack::ShowExceptions
Cuba.use Rack::Protection
Cuba.use Rack::Reloader

Cuba.plugin Cuba::Render
Cuba.plugin Shield::Helpers

# set a default path and layout for the views
Cuba.settings[:render][:views] = File.expand_path("app/views", Dir.pwd)
Cuba.settings[:render][:layout] = "layouts/application"

# load database configuration
Mongoid.load!("config/mongoid.yml")

# require application files
Dir["app/helpers/**/*.rb"].each { |f| require(f) }
Dir["app/models/**/*.rb"].each  { |f| require(f) }
Dir["app/routes/**/*.rb"].each  { |f| require(f) }

Cuba.define do
  on "api" do
    on "projects" do
      run ProjectsRouter
    end
  end

  on default do
    res.write view("index")
  end
end
