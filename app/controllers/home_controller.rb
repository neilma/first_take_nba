class HomeController < ApplicationController
  def index
    @scorebox = scorebox
  end

  def headline_vid
    url = "https://www.googleapis.com/youtube/v3/search?key=#{ENV['YOUTUBE_KEY']}&q=first+take+nba&part=snippet&order=date&maxResults=3"
    # resp = Net::HTTP.start(URI(url).host, URI(url).port, use_ssl: true, ca_file: Rails.root.join("lib/ca-bundle.crt").to_s) do |http|
        resp = Net::HTTP.start(URI(url).host, URI(url).port, use_ssl:true, ca_file: '/usr/lib/ssl/certs/ca-certificates.crt') do |http|
      # resp = Net::HTTP.start(URI(url).host, URI(url).port, use_ssl:true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      http.request(Net::HTTP::Get.new(URI(url)))
    end
    respond_to do |format|
      format.json { render json: { vid_ids: get_vid_ids(resp) }.to_json.tap{|i| puts i} }
    end
  end

  def scorebox
    scores = CGI.unescape Net::HTTP.get(URI(JSON.parse(File.read("#{Rails.root}/config/ws.json"))["scorebox"]))
    scores = scores.split(/\&nba_s_delay=\d+\&nba_s_stamp=\d+|\&nba_s_left\S+=/)
    scores.delete("")
    scores.inject([]) do |memo, obj|
      scores_only = /^.*?(?=&nba_s_right)/.match(obj)[0]
      if scores_only =~ /at\s/
        scores_only.gsub!(/at\s/, "@ </br>")
        memo << scores_only
      else
        /(\d+\s+)/.match(scores_only)
        # scores_only.scan(/(\D+\d+)/)
        memo << scores_only.sub($1, "#{$1} </br>").gsub("^", "")
      end
      memo
    end
  end

  private
  def get_vid_ids(resp)
    Rails.logger.info resp.body
    Array.wrap(JSON.parse(resp.body)['items']).inject([]){ |memo, obj| memo << obj['id']['videoId'] }
  end
end