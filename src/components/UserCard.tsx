import type { User } from '../model/user'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './UserCard.css'

type Props = {
  user: User
}

export default function UserCard({ user }: Props) {

  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(user.id))
  }, [user.id])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    let updatedFavorites

    if (favorites.includes(user.id)) {
      updatedFavorites = favorites.filter((id: number) => id !== user.id)
    } else {
      updatedFavorites = [...favorites, user.id]
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="user-card">
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <div className="user-info">
        <h3>{user.firstName} {user.lastName}</h3>
        <p className="email">{user.email}</p>

        <div className="card-actions">
          <Link to={`/users/${user.id}`}>
            <button className="action-btn">Détails</button>
          </Link>
          <button className="action-btn favorite-btn" onClick={toggleFavorite}>
            {isFavorite ? "⭐ Favori" : "☆ Favori"}
          </button>
        </div>


      </div>
    </div>
  )
}
