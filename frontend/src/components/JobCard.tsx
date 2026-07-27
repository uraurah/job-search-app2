import './JobCard.css'

import type { Job } from '../types/job'


type JobCardProps = {
    job: Job
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <main>
                <article key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p>カテゴリ: {job.category}</p>
                    <p>年収: {job.salary}万円</p>
                </article>

        </main>
        
    )
}
