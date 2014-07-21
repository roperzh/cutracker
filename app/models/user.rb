class User
  include Mongoid::Document
  include Shield::Model

  # Field definitions
  field :name,             type: String
  field :surname,          type: String
  field :email,            type: String
  field :crypted_password, type: String

  # Validations
  validates :name, :surname, :email, :crypted_password, presence: true
  validates :email, uniqueness: true
  validates :email, format: {
    with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  }

  # Associations
  has_and_belongs_to_many :projects
  has_many :tasks
  has_many :chat_messages

  def self.[](id)
    find(id)
  end

  def self.fetch(email)
    where(email: email).first
  end

  def full_name
    "#{name} #{surname}"
  end
end
