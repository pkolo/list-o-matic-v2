module BallotsHelper

  def copy_data(ballot)
    ballot.votes.each do |vote|
      album_data = self.get_album_data(vote.album_id)
      discog = Discog.find_or_create_by(album_id: vote.album_id, year: album_data["year"], title: album_data["title"], artist: album_data["artists"][0]["name"], label: album_data["labels"][0]["name"])

      discog.img_url = album_data["images"][0]["uri"] if album_data["images"]
      discog.video_url = album_data["videos"][0]["uri"] if album_data["videos"]

      discog.save
    end
  end

  def album_search(params)
    url = "https://api.discogs.com"

    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end

    response = conn.get do |req|
      req.headers['User-Agent'] = "List-O-Matic v2, +https://list-o-matic.herokuapp.com"
      req.headers['Authorization'] = "Discogs key=#{ENV['DISCOG_KEY']}, secret=#{ENV['DISCOG_SECRET']}"
      req.url '/database/search', release_title: params[:album], artist: params[:artist], year: params[:year], type: 'release', per_page: 10
    end
    response.body
  end

  def get_album_data(album_id)
    url = "https://api.discogs.com"

    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end

    response = conn.get do |req|
      req.headers["User-Agent"] = "List-O-Matic v2, +https://list-o-matic.herokuapp.com"
      req.headers['Authorization'] = "Discogs key=#{ENV['DISCOG_KEY']}, secret=#{ENV['DISCOG_SECRET']}"
      req.url "/releases/#{album_id}"
    end
    response.body
  end

  module_function :copy_data, :get_album_data

end
