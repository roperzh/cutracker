module AssetHelpers
  def stylesheet_tag(file)
    "<link rel='stylesheet' type='text/css' href='#{asset_path(file)}'>"
  end

  def javascript_tag(file)
    "<script type='text/javascript' src='#{asset_path(file)}'></script>"
  end

  def asset_path(file)
    manifest = Sprockets::Manifest.new('./public/assets')

    if ENV['RACK_ENV'] == 'production'
      "/assets/#{manifest.assets[file]}"
    else
      "/assets/#{file}"
    end
  end
end
