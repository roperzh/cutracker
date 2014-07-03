class SessionManager < Cuba
  define do
    on get do
      res.write view("login")
    end

    on post do
      on param("email"), param("pass") do |email, pass|
        res.redirect "/login" unless login(User, email, pass)

        res.redirect("/dashboard")
      end
    end

    on delete do
      logout(User)
      res.redirect root
    end
  end
end
