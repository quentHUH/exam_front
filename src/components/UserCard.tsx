import type { User } from '../model/user'
import './UserCard.css'

type Props = {
  user: User
}

export default function UserCard({ user }: Props) {
  return (
    <div className="user-card">
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <div className="user-info">
        <h3>{user.firstName} {user.lastName}</h3>
        <p className="email">{user.email}</p>
      </div>
    </div>
  )
}
