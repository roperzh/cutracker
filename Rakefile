require "bundler"

rack_env = ENV.fetch("RACK_ENV", "development").to_sym
Bundler.setup(:default, rack_env)

desc "Simple irb console"
task :console do
  ENV['RACK_ENV'] ||= 'development'
  %w(irb irb/completion).each { |f| require f }
  require_relative 'app'

  ARGV.clear
  IRB.start
end

# Tasks for asset precompilation, more information on how this works
# in the sprockets repo:
# github.com/sstephenson/sprockets/blob/master/lib/rake/sprocketstask.rb
require  "rake/sprocketstask"

environment = Sprockets::Environment.new do |env|
  %w[javascripts stylesheets images].each do |path|
    env.append_path "app/assets/#{path}"
  end
end

Rake::SprocketsTask.new do |t|
  t.environment = environment
  t.output = "public/assets"
  t.assets = %w[application.js application.css *.png *.jpeg]
end
