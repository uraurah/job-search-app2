import JobCard from './JobCard'
import type { Job } from '../types/job'
import './JobList.css'

type JobListProps = {
  jobs: Job[]
  totalCount: number
}

export default function JobList({
  jobs,
  totalCount,
}: JobListProps) {
  return (
    <div className="job-list">
      <h2>求人一覧</h2>

      <p className="job-count">
        該当件数: {totalCount}件
      </p>

      {jobs.length === 0 ? (
        <p>条件に合う求人がありません。</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      )}
    </div>
  )
}