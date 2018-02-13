require 'csv'

csv_text = File.read('lib/assets/comics.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  comic = row.to_hash
  publisher = Publisher.find_or_create_by(name: comic['pub'])
  series = Series.find_or_create_by(title: comic["series_title"]) do |series|
    puts publisher.inspect
    series.publisher = publisher
  end

  issue = Issue.new
  issue.title = comic["issue_title"]
  issue.external_image_url = (comic["cover_image"] || Faker::Placeholdit.image("320x480", 'jpg', Faker::Color.hex_color.gsub("#", ""), '000', comic["issue_title"]))
  issue.description = (comic["description"] || "")
  issue.page_count = (comic["pages"].to_i || nil)
  issue.release_date = (comic["release_date"].to_date || "")
  issue.series = series
  issue.save

  if comic["writers"]
    writers_list = comic["writers"].split(", ")
    writers_list.each do |writer_name|
      writer = Writer.find_or_create_by(name: writer_name )
      issue.writers << writer
    end
  end

  if comic["inkers"]
    inkers_list = comic["inkers"].split(", ")
    inkers_list.each do |inker_name|
      inker = Inker.find_or_create_by(name: inker_name )
      issue.inkers << inker
    end
  end

  if comic["artists"]
    artists_list = comic["artists"].split(", ")
    artists_list.each do |artist_name|
      artist = Artist.find_or_create_by(name: artist_name )
      issue.artists << artist
    end
  end

  if comic["colorists"]
    colorists_list = comic["colorists"].split(", ")
    colorists_list.each do |colorist_name|
      colorist = Colorist.find_or_create_by(name: colorist_name )
      issue.colorists << colorist
    end
  end
end
