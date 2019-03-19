class CreateVerbs < ActiveRecord::Migration[5.2]
  def change
    create_table :verbs do |t|
      t.string :infinitiv
      t.string :presens
      t.string :preteritum
      t.string :partizip_zwei
      t.string :translations
      t.json :commentaries
      t.timestamps
    end
  end
end
