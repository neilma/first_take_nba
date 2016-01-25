class HomeController < ApplicationController
  def index
    @scorebox = scorebox
  end

  def scorebox
    scores = CGI.unescape Net::HTTP.get(URI(JSON.parse(File.read("#{Rails.root}/config/ws.json"))["scorebox"]))
    scores = scores.split(/\&nba_s_delay=\d+\&nba_s_stamp=\d+|\&nba_s_left\S+=/)
    scores.delete("")
    scores.inject([]) do |memo, obj|
      scores_only = /^.*?(?=&nba_s_right)/.match(obj)[0]
      scores_only.gsub!("at", "@ </br>")
      /(\d+\s+)/.match(scores_only)
      # scores_only.scan(/(\D+\d+)/)
      memo << scores_only.sub($1, "#{$1} </br>").gsub("^", "")
      memo
    end
  end
end