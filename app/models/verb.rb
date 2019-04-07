class Verb < ApplicationRecord
  validates :infinitiv, presence: true
  validates :presens, presence: true
  validates :preteritum, presence: true
  validates :partizip_zwei, presence: true
  validates :translations, presence: true
end
