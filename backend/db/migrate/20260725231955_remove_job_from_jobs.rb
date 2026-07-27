class RemoveJobFromJobs < ActiveRecord::Migration[8.1]
  def change
    remove_column :jobs, :job, :string
  end
end
