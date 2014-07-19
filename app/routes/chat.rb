Vertx::EventBus.register_handler("chat") do |event|
  message = ChatMessage.new(event.body)
  message.save
end
