module UserHelpers
  def current_user
    authenticated(User)
  end
end
