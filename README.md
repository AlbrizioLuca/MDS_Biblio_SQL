# MDS_Biblio_SQL

Ce dépôt est composé de deux répertoires, il est conseillé de travailler sur deux terminaux à la fois.

- `front` : compilé avec le framework ReactJs
- `back` : compilé avec le framework Node JS

## Étapes à suivre

### Création de la base de données

1. Ouvrez un IDE de base de données.
2. Lancez le script fourni sur une base de données MySQL.

### Configuration du back-end

1. Déplacez-vous dans le dossier `back` avec la commande :
   ```
   cd back
   ```
2. Modifiez le fichier `.env` avec les bons identifiants (ce fichier a été laissé en clair pour faciliter la tâche).
3. Installez tous les packages nécessaires avec la commande :
   ```
   npm install
   ```
4. Vous pouvez ensuite lancer le serveur avec la commande :
   `   npm start`
   Le back-end sera accessible à l'adresse http://localhost:5000.

### Configuration du front-end

1. Déplacez-vous dans le dossier `front` avec la commande :
   ```
   cd front
   ```
2. Installez tous les packages nécessaires avec la commande :
   ```
   npm install
   ```
3. Vous pouvez ensuite lancer le serveur avec la commande :
   ```
   npm start
   ```
   Le front-end sera accessible à l'adresse http://localhost:3000.

Pour utiliser l'application veuillez créer un utilisateur via l'onglet "S'inscrire" ou bien vous pouvez vous connectez avec les credentials suivants :

```
email: gestionnaire@mail.com
password: Azerty123.
```

Vous trouverez les différentes requêtes SQL nécessaire à l'exercice dans la partie back au niveau des sous dossiers :

`abonne`
`livres`
mais aussi
`auth`
