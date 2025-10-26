
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles.css'
//import './App.css';
import { UserList } from './components/UserList'
import UserDetail from './components/UserDetail'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
