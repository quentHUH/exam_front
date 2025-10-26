
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles.css'
//import './App.css';
import { UserList } from './components/UserList'
import UserDetail from './components/UserDetail'
import { useState, useEffect } from 'react'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="app">
      <button className='action-btn theme-btn' onClick={toggleTheme}>
        Passer en mode {theme === 'light' ? 'sombre' : 'clair'}
      </button>

      {<BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>}
    </div>
  )
}

export default App
