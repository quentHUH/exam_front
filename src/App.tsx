import { useEffect, useState } from 'react'
import './App.css'
import { fetchUsers } from './data/recupApi'
import type { User } from './model/user'

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
          <div key={user.id} className="user-card">
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
