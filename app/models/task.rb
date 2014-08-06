class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::TagsArentHard

  # Field definitions
  field :name,        type: String
  field :duration,    type: String, default: "00:00:00"
  field :description, type: String
  field :status,      type: Integer, default: 0

  taggable_with :tags

  # Validations
  validates :name, :status, presence: true

  # Associations
  belongs_to :user
  belongs_to :project

  def self.last_by_user(user_id)
    where(user_id: user_id).desc(:updated_at).limit(10)
  end

  def active?
    status == 1
  end

  def start!
    self.status = 1
  end

  def pause!
    self.status = 0
  end
end
