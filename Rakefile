require "bundler"

rack_env = ENV.fetch("RACK_ENV", "development").to_sym
Bundler.setup(:default, rack_env)

# Load environment variables from .env files
task :environment do
  require "dotenv"
  Dotenv.load ".env.#{rack_env}", ".env"
end

task :console do
  ENV['RACK_ENV'] ||= 'development'
  %w(irb irb/completion).each { |f| require f }
  require_relative 'app'

  ARGV.clear
  IRB.start
end
