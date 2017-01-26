module BallotsHelper

  def album_search(params)
    url = "https://api.discogs.com/database/"

    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end

    response = conn.get('search', release_title: params[:album], artist: params[:artist], type: 'release', token: ENV["DISCOG_TOKEN"], per_page: 5)
    response.body
  end

  def get_album_data(album_id)
    url = "https://api.discogs.com/"

    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end

    response = conn.get("releases/#{album_id}")
    response.body
  end

end
