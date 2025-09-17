import { useState } from 'react'
import { Navigation } from './components'
import { HomePage, ProjectsPage, ProfilePage } from './pages'
import './App.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'projects':
        return <ProjectsPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div>
      <Navigation onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
