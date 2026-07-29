import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import JobList from './JobList'
import type { Job } from '../types/job'
import './MainLayout.css'

export default function MainLayout() {
  const API_URL = import.meta.env.VITE_API_URL
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minimumSalary, setMinimumSalary] = useState(0)

  // 現在表示しているページ
  const [currentPage, setCurrentPage] = useState(1)

  // 1ページに表示する求人件数
  const jobsPerPage = 10

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs`)

        if (!response.ok) {
          console.error('求人一覧の取得に失敗しました')
          return
        }

        const data: Job[] = await response.json()
        setJobs(data)
      } catch (error) {
        console.error('Railsサーバーとの通信に失敗しました', error)
      }
    }

    fetchJobs()
  }, [])

  // 絞り込み条件が変わったら1ページ目に戻す
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, minimumSalary])

  console.log('取得したjobs:', jobs)
  console.log('選択カテゴリ:', selectedCategories)
  console.log('最低年収:', minimumSalary)

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category)

    const matchesSalary = job.salary >= minimumSalary

    console.log({
      job,
      matchesCategory,
      matchesSalary,
    })

    return matchesCategory && matchesSalary
  })

  // 全ページ数
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  // 現在のページで表示する範囲を計算
  const firstJobIndex = (currentPage - 1) * jobsPerPage
  const lastJobIndex = firstJobIndex + jobsPerPage

  // 現在のページに表示する求人だけ取り出す
  const currentJobs = filteredJobs.slice(firstJobIndex, lastJobIndex)

  return (
    <div className="main-layout">
      <Sidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        minimumSalary={minimumSalary}
        setMinimumSalary={setMinimumSalary}
      />

      <main className="main-content">
        <JobList
            jobs={currentJobs}
            totalCount={filteredJobs.length}
        />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
            >
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1

              return (
                <button
                  type="button"
                  key={pageNumber}
                  className={
                    currentPage === pageNumber ? 'active' : ''
                  }
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}
      </main>
    </div>
  )
}