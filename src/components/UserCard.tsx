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
        <p className="meta">Age: {user.age} · {user.company?.name ?? '-'}</p>
        <p className="address">{user.address?.city ?? ''}{user.address ? `, ${user.address.country}` : ''}</p>
        <p className="phone">{user.phone}</p>
      </div>
    </div>
  )
}
