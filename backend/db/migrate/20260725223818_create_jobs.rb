class CreateJobs < ActiveRecord::Migration[8.1]
  def change
    create_table :jobs do |t|
      t.string :job
      t.string :title
      t.string :category
      t.integer :salary

      t.timestamps
    end
  end
end
