class SessionManager < Cuba
  define do
    on get do
      res.write view("login")
    end

    on post do
      on param("email"), param("pass") do |email, pass|
        test = login(User, email, pass)
        if test
          res.redirect "/dashboard"
        else
          res.status = 401
          res.write "Wrong username or password"
        end
      end
    end

    on delete do
      logout(User)
      res.write view("login")
    end
  end
end
