# Gestionnaire de Tâches

Un gestionnaire de tâches complet développé avec un front-end en React et un back-end en Node.js/Express, utilisant Ant Design pour le design des composants et MongoDB pour la persistance des données. Ce projet est actuellement hébergé à cette adresse : [https://organize-me-front.vercel.app/](https://organize-me-front.vercel.app/). Le code source est disponible sur GitHub à l'adresse suivante : [https://github.com/Enzo91080/organize-me](https://github.com/Enzo91080/organize-me).

---

## Fonctionnalités

### Front-end
- Gestion des tâches (ajout, modification, suppression, marquage comme terminée).
- Affichage des tâches en vue **grille** ou **liste**.
- Recherche de tâches par titre ou description.
- Inscription et connexion des utilisateurs.
- Design responsive utilisant **Ant Design**.
- Bouton stylisé pour marquer une tâche comme terminée.
- Vue des tâches terminées et en cours.
- Utilisation de **React Router** pour la navigation.

### Back-end
- API REST pour gérer les tâches et l'authentification.
- Gestion sécurisée des utilisateurs (inscription, connexion).
- Utilisation de JWT pour l'authentification.
- Validation des données côté serveur avec Express Validator.
- Gestion de la base de données avec MongoDB (via Mongoose).

---

## Technologies Utilisées

### Front-end
- **React** avec **Hooks**
- **Ant Design** pour les composants UI
- **React Router** pour la navigation
- **Axios** pour les appels API

### Back-end
- **Node.js** avec **Express**
- **MongoDB** avec **Mongoose**
- **jsonwebtoken** pour la gestion des tokens
- **bcrypt** pour le hachage des mots de passe

---

## Installation

### Prérequis
- Node.js v16 ou supérieur
- MongoDB installé localement ou accessible via une URL distante

### Clone du projet
```bash
git clone https://github.com/Enzo91080/organize-me.git
cd organize-me

# Installation des dépendances du front-end
cd organize-me-front
pnpm install

# Installation des dépendances du back-end
cd organize-me-back
npm install

# Retour au dossier racine
cd ..
```

### Configuration de la base de données
- Créer un fichier `.env` dans le dossier `organize-me-back` et y ajouter la configuration suivante :
```env
MONGODB_URI=mongodb://localhost:27017/organize-me
PORT=3000
JWT_SECRET=secret
```
- Remplacer `mongodb://localhost:27017/organize-me` par l'URL de votre base de données MongoDB. Par exemple :
```env
MONGODB_URI=mongodb+srv://enzoaime91:organizeme91@organize-me-cluster.8mhf8.mongodb.net/?retryWrites=true&w=majority&appName=organize-me-cluster
PORT=3000
JWT_SECRET=secret
```

### Configuration du front-end
- Créer un fichier `.env` dans le dossier `organize-me-front` et y ajouter la configuration suivante :
```env
REACT_APP_API_URL=http://localhost:3000
```
- Remplacer `http://localhost:3000` par l'URL de votre API back-end si nécessaire.

### Lancement de l'application
```bash
# Lancer le serveur back-end
cd organize-me-back
npm start

# Lancer le serveur front-end
cd organize-me-front
pnpm start
```

---
