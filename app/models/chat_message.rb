class ChatMessage
  include Mongoid::Document

  # Field definitions
  field :content, type: String

  # Associations
  belongs_to :user
end
