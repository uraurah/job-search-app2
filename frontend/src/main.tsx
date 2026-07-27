import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// import JobListPage from './pages/JobListPage'
// import JobPostPage from './pages/JobPostPage'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <JobListPage /> */}
    {/* <JobPostPage /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
