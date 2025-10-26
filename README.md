# Exam Front - Application de Gestion des Utilisateurs

Une application React développée avec TypeScript et Vite pour afficher et gérer une liste d'utilisateurs récupérés depuis une API externe.

## Fonctionnalités

- **Affichage des utilisateurs** : Liste des utilisateurs présentée sous forme de grille avec pagination (9 utilisateurs par page pour des raisons esthetiques).
- **Recherche** : Recherche en temps réel par prénom, nom ou email.
- **Tri** : Tri par nom, âge ou favoris.
- **Favoris** : Possibilité de marquer des utilisateurs comme favoris (stockés localement).
- **Thème** : Basculement entre mode clair et sombre (aussi stockés localement).
- **Détails utilisateur** : Page dédiée affichant les informations complètes d'un utilisateur (âge, email, téléphone, entreprise, adresse).
- **Gestion d'erreurs** : Affichage des erreurs et bouton de réessai en cas de problème de chargement.

## Technologies utilisées
- React 19
- TypeScript
- Vite
- React Router DOM
- API DummyJSON pour les données utilisateurs

## Installation et exécution

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Lancer l'application en mode développement :
   ```bash
   npm run dev
   ```

3. Ouvrir [http://localhost:5173](http://localhost:5173) dans votre navigateur.
