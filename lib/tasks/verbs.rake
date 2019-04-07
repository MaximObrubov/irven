namespace :verbs do
  desc "Add verbs from CSV"
  task add: :environment do
    require "csv"
    path = Rails.root.join("public", "parsed_verbs.csv")
    csv_text = File.read(path)
    csv = CSV.parse(csv_text, headers: true, col_sep: ";")
    puts csv.inspect

    csv.each do |row|
      next unless Verb.find_by(infinitiv: row["infinitiv"]).nil?
      v = Verb.new
      v.infinitiv = row["infinitiv"].strip
      v.presens = row["presens"].strip
      v.preteritum = row["preteritum"].strip
      v.partizip_zwei = row["partizip_zwei"].strip
      v.translations = row["translations"].strip
      v.save
      puts "#{v.infinitiv} saved"
    end
  end
end
