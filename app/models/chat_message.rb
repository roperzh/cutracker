class ChatMessage
  include Mongoid::Document
  include Mongoid::Timestamps::Created

  scope :last_ten, ->{ desc(:created_at).limit(10) }

  # Field definitions
  field :content, type: String

  # Associations
  belongs_to :user
end
