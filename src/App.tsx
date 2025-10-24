import { useEffect, useState } from 'react'
import './App.css'
import { fetchUsers } from './data/recupApi'
import type { User } from './model/user'
import UserCard  from './components/UserCard'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
      .then((u) => { setUsers(u) })
  }, [])

 
  return (
    <div className="app">
      <h1>Liste des utilisateurs</h1>
      <div className="users-grid">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App
