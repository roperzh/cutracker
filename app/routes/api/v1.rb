module Api
  class V1 < Cuba
    define do
      on get do
        res.write "funca"
      end
    end
  end
end
