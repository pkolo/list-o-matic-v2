class AddReviewToVote < ActiveRecord::Migration[5.0]
  def change
    add_column :votes, :review, :text, default: ""
  end
end
