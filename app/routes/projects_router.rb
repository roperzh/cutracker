class ProjectsRouter < Cuba
  define do
    res.headers["Content-Type"] = "application/json; charset=utf-8"

    on get do
      on root do
      end
    end
  end

  def current_user
    authenticated(User)
  end
end
