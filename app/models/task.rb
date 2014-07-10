class Task
  include Mongoid::Document
  include Mongoid::TagsArentHard

  field :name,        type: String
  field :duration,    type: String
  field :description, type: String
  field :status,      type: Integer

  taggable_with :tags

  # Associations
  belongs_to :user
  belongs_to :project

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
