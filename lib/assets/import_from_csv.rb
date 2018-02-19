require 'csv'
require 'faker'

csv_text = File.read('lib/assets/comics.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  comic = row.to_hash
  publisher = Publisher.find_or_create_by(name: comic['pub'])
  series = Series.find_or_create_by(title: comic["series_title"]) do |series|
    puts publisher.inspect
    series.publisher = publisher
  end

  issue = Issue.find_or_create_by(title: comic["issue_title"]) do |issue|
    issue.external_image_url = (comic["cover_image"])
    issue.description = (comic["description"] || "")
    issue.page_count = (comic["pages"].to_i || nil)
    issue.release_date = (comic["release_date"].to_date || "")
    issue.series = series
  end

  if comic["writers"]
    writers_list = comic["writers"].split(", ")
    writers_list.each do |writer_name|
      writer = Writer.find_or_create_by(name: writer_name)
      issue.writers << writer unless issue.writers.include?(writer)
    end
  end

  if comic["inkers"]
    inkers_list = comic["inkers"].split(", ")
    inkers_list.each do |inker_name|
      inker = Inker.find_or_create_by(name: inker_name)
      issue.inkers << inker unless issue.inkers.include?(inker)
    end
  end

  if comic["artists"]
    artists_list = comic["artists"].split(", ")
    artists_list.each do |artist_name|
      artist = Artist.find_or_create_by(name: artist_name)
      issue.artists << artist unless issue.artists.include?(artist)
    end
  end

  if comic["colorists"]
    colorists_list = comic["colorists"].split(", ")
    colorists_list.each do |colorist_name|
      colorist = Colorist.find_or_create_by(name: colorist_name)
      issue.colorists << colorist unless issue.colorists.include?(colorist)
    end
  end
end

Issue.reindex
