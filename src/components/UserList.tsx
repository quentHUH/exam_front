import { useEffect, useState } from 'react'
import { fetchUsers } from '../data/recupApi'
import type { User } from '../model/user'
import UserCard from './UserCard'
import './UserList.css';


export const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "age">("name")


  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchUsers()
      .then((u) => { if (mounted) setUsers(u) })
      .catch((e) => { if (mounted) setError(String(e)) })
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [])



  const filteredUsers = users
    .filter(user =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.lastName.localeCompare(b.lastName)
      } else {
        return a.age - b.age
      }
    })



  if (loading) return <div className="app"><h1>Chargement...</h1></div>
  if (error) return <div className="app"><h1>Erreur: {error}</h1></div>
  if (users.length === 0) return <div className="app"><p>Aucun utilisateur trouvé.</p></div>


  return (
    <div className="app">
      <h1>Liste des utilisateurs</h1>


      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "age")}>
          <option value="name">Trier par nom</option>
          <option value="age">Trier par âge</option>
        </select>
      </div>



      <div className="users-grid">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

