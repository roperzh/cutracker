require "cuba"
require "cuba/render"
require "erb"
require "mongoid"
require "mongoid-tags-arent-hard"
require "rack/protection"
require "shield"
require "dotjs_sprockets"
require 'vertx'

Cuba.use Rack::Session::Cookie, key: ENV["APP_KEY"], secret: ENV["APP_SECRET"]
Cuba.use Rack::Protection::RemoteReferrer
Cuba.use Rack::MethodOverride
Cuba.use Rack::Protection

Cuba.plugin Cuba::Render
Cuba.plugin Shield::Helpers

# set a default path and layout for the views
Cuba.settings[:render][:views] = File.expand_path("app/views", Dir.pwd)
Cuba.settings[:render][:layout] = "layouts/application"

# load database configuration
Mongoid.load!("config/mongoid.yml")

# require application files
Dir["./app/helpers/**/*.rb"].each { |f| require(f) }
Dir["./app/models/**/*.rb"].each  { |f| require(f) }
Dir["./app/routes/**/*.rb"].each  { |f| require(f) }

Cuba.plugin AssetHelpers
Cuba.plugin UserHelpers

Cuba.define do
  on "sessions" do
    run SessionManager
  end

  on authenticated(User) do
    on "dashboard" do
      messages = ChatMessage.last_ten
      tasks = Task.last_by_user(current_user.id)
      res.write view("dashboard/show", tasks: tasks , messages: messages)
    end

    on "tasks" do
      run TaskManager
    end
  end

  on default do
    res.status = 401
    res.redirect "/sessions"
  end
end
