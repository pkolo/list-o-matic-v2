class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :owned_lists, class_name: List, foreign_key: 'owner_id'
  has_many :ballots, foreign_key: 'voter_id'
  has_many :lists_voted_on, through: :ballots, source: :list
  has_many :votes, through: :ballots
end
