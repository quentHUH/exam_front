import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../data/recupApi";
import type { User } from "../model/user";
import { Link } from 'react-router-dom';
import '../styles.css';


function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadKey, setReloadKey] = useState<number>(0)



  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const data = await fetchUserById(parseInt(id));
          setUser(data);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'utilisateur :", err);
        setError("Impossible de récupérer les détails de l'utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, reloadKey]);

  if (loading) return <div className="spinner" />

if (error) {
  return (
    <div className="error-block">
      <p className="error">{error}</p>
      <button className="action-btn" onClick={() => setReloadKey(prev => prev + 1)}>
        Réessayer
      </button>
    </div>)
}

  if (!user) return <div>Aucun utilisateur trouvé.</div>;

  return (
    <div className="user-detail">
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
          <button className="action-btn">Retour</button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetail;