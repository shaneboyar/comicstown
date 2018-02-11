# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

# Creates 50 unique Writers
50.times do
  Writer.create(name: Faker::Name.unique.name)
end

# Creates 50 unique Artists
50.times do
  Artist.create(name: Faker::Name.unique.name)
end

# Creates 50 unique Inkers
50.times do
  Inker.create(name: Faker::Name.unique.name)
end

# Creates 50 unique Colorists
50.times do
  Colorist.create(name: Faker::Name.unique.name)
end

# Creates 5 Publishers
5.times do
  Publisher.create(name: "#{Faker::Company.name} #{Faker::Company.suffix}")
end

# Creates 5 Series per Publisher
publishers = Publisher.all
publishers.each do |publisher|
  5.times do
    publisher.series << Series.create(title: Faker::Superhero.name)
  end
end

# Creates rand(10) Issues per Series
series = Series.all
series.each do |series|
  first_release_date = Faker::Date.backward(3650)
  series_cover_color = Faker::Color.hex_color.gsub("#", "")
  last_used_date = nil
  series_writer = Writer.order("RANDOM()").first
  series_artist = Artist.order("RANDOM()").first
  rand(10).times do |i|
    issue = Issue.new
    issue_title = series.title + " #{i+1}"
    issue.title = issue_title
    issue.description = Faker::Lorem.paragraph
    issue.page_count = 22
    if i.zero?
      release_date = first_release_date
      last_used_date = release_date
    else
      release_date = Faker::Date.between(last_used_date, Date.today)
      last_used_date = release_date
    end
    issue.release_date = release_date
    issue.external_image_url = Faker::Placeholdit.image("320x480", 'jpg', series_cover_color, '000', issue_title)
    issue.save
    series.issues << issue
    issue.writers << series_writer
    issue.artists << series_artist
  end
end
