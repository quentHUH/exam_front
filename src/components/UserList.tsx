import { useEffect, useState } from 'react'
import { fetchUsers } from '../data/recupApi'
import type { User } from '../model/user'
import UserCard from './UserCard'
import '../styles.css';
//import './UserList.css';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "age" | "favorites">("name")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const usersPerPage = 9 //j'ai mis 9 et non 10 comme dans l'énoncé car j'ai des lignes de 3 cards dans la grille
  // et ce serait plus esthétique avec 3 lignes pleines




  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        setError(null) // reset error before fetch
        const data = await fetchUsers()
        setUsers(data)
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err)
        setError("Impossible de récupérer les utilisateurs. Veuillez réessayer plus tard.")
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])




  const filteredUsers = users
    .filter(user =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "favorites") {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        if (favorites.length === 0) return a.lastName.localeCompare(b.lastName)
        const aFav = favorites.includes(a.id) ? 1 : 0
        const bFav = favorites.includes(b.id) ? 1 : 0
        return bFav - aFav // les favoris en premier
      }
      if (sortBy === "name") {
        return a.lastName.localeCompare(b.lastName)
      }
      return a.age - b.age
    })



  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }




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
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "age" | "favorites")}>
          <option value="name">Trier par nom</option>
          <option value="age">Trier par âge</option>
          <option value="favorites">Trier par favoris</option>
        </select>
      </div>

      <div className="users-grid">
        {currentUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>


      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    //tous les bouton sont mis a la suite pour naviguer plus rapidement je changerais peut-etre pas la suite
  )
}

