import { Route, Routes } from 'react-router'
import Header from './components/Header'
import JobListPage from './pages/JobListPage'
import JobPostPage from './pages/JobPostPage'

export default function App() {

  return (
    <>
      <Header/>

    <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/jobs/new" element={<JobPostPage />} />
    </Routes>

    </>
  )
}