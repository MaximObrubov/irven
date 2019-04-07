namespace :verbs do
  desc "Add verbs from CSV"
  task :add do
    require "csv"
    path = Rails.root.join("public", "parsed_verbs.txt")
    csv_text = File.read(path)
    csv = CSV.parse(csv_text, :headers => true)
    puts csv.inspect

    csv.each do |row|
      
    end
  end
end
