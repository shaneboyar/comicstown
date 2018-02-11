require 'csv'

csv_text = File.read('../assets/comics.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  Moulding.create!(row.to_hash)
end
