import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../data/recupApi";
import type { User } from "../model/user";
import { Link } from 'react-router-dom';


function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      fetchUserById(parseInt(id)).then((u) => setUser(u));
    }
  }, [id]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="user-card">
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="user-image" />

      <div className="user-content">
        <h2>{user.firstName} {user.lastName}</h2>
        <p><strong>Âge :</strong> {user.age}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Téléphone :</strong> {user.phone}</p>

        <h3>Entreprise</h3>
        <p><strong>Nom :</strong> {user.company.name}</p>
        <p><strong>Titre :</strong> {user.company.title}</p>

        <h3>Adresse</h3>
        <p><strong>Ville :</strong> {user.address.city}</p>
        <p><strong>État :</strong> {user.address.state}</p>
        <p><strong>Pays :</strong> {user.address.country}</p>
        <Link to={`/`}>
        <button>Retour</button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetail;