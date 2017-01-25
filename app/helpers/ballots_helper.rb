module BallotsHelper

  def album_search(params)
    url = "https://api.discogs.com/database/"
    # uri = URI("https://api.discogs.com/database/search?release_title=#{params[:album]}&artist=#{params[:artist]}&token=#{ENV['DISCOG_TOKEN']}")

    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end

    response = conn.get('search', release_title: params[:album], artist: params[:artist], token: ENV["DISCOG_TOKEN"], per_page: 5)
    response.body
  end

end
