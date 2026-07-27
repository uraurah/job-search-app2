class Job < ApplicationRecord
  validates :title, presence: true
  validates :category, presence: true
  validates :salary, presence: true
end
