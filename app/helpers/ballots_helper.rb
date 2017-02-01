module BallotsHelper

  def copy_data(ballot)
    ballot.votes.each do |vote|
      album_data = self.get_album_data(vote.album_id)
      new_discog = Discog.new(album_id: vote.album_id, year: album_data["year"], title: album_data["title"], artist: album_data["artists"][0]["name"], label: album_data["labels"][0]["name"])
      new_discog.save
    end
  end

  def album_search(params)
    url = "https://api.discogs.com/database/"

    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end

    response = conn.get('search', release_title: params[:album], artist: params[:artist], year: params[:year], type: 'release', token: ENV["DISCOG_TOKEN"], per_page: 10, "User-Agent" => "List-O-Matic v2, +https://list-o-matic.herokuapp.com")
    response.body
  end

  def get_album_data(album_id)
    url = "https://api.discogs.com/"

    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end

    response = conn.get("releases/#{album_id}", "User-Agent" => "List-O-Matic v2, +https://list-o-matic.herokuapp.com")
    response.body
  end

  module_function :copy_data, :get_album_data

end
