import { useEffect, useState } from 'react'
import { fetchUsers } from '../data/recupApi'
import type { User } from '../model/user'
import UserCard  from './UserCard'
import './UserList.css';


export const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchUsers()
      .then((u) => { if (mounted) setUsers(u) })
      .catch((e) => { if (mounted) setError(String(e)) })
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [])

  if (loading) return <div className="app"><h1>Chargement...</h1></div>
  if (error) return <div className="app"><h1>Erreur: {error}</h1></div>
  if (users.length === 0) return <div className="app"><p>Aucun utilisateur trouvé.</p></div>
 
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
