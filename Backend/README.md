# Documentation de l'API Truck Display

## Généralités

L'API Truck Display fournit des points d'accès pour gérer les camions, les médias et l'authentification des utilisateurs.

## Base URL

Toutes les routes de l'API sont basées sur :
`http://your_server_address:4000/`

## Points d'accès

### Authentification

#### Inscription
- **Méthode** : POST
- **URL** : `/auth/signup`
- **Paramètres** :
    - `username` (String): Nom d'utilisateur
    - `password` (String): Mot de passe
- **Réponse** : Token JWT pour l'authentification

#### Connexion
- **Méthode** : POST
- **URL** : `/auth/signin`
- **Paramètres** :
    - `username` (String): Nom d'utilisateur
    - `password` (String): Mot de passe
- **Réponse** : Token JWT pour l'authentification

### Camions

#### Ajouter un camion
- **Méthode** : POST
- **URL** : `/camions`
- **Paramètres** :
    - `id` (Int32): Identifiant du camion
    - `transporteur` (String): Nom du transporteur
    - `immatriculation` (String): Immatriculation du camion
    - `quai` (String): Quai assigné
    - `date_appel` (DateTime): Date d'appel du camion

#### Lister tous les camions
- **Méthode** : GET
- **URL** : `/camions`
- **Réponse** : Liste de tous les camions

#### Supprimer un camion
- **Méthode** : DELETE
- **URL** : `/camions/:id`
- **Paramètres** :
    - `id` (Int32): Identifiant du camion à supprimer

#### Mettre à jour la liste des camions
- **Méthode** : POST
- **URL** : `/camions/update`
- **Paramètres** : Liste des camions à ajouter (même structure que l'ajout d'un camion)

### Médias

#### Uploader un média
- **Méthode** : POST
- **URL** : `/media-management/upload`
- **Paramètres** :
    - `media` (File): Fichier média à uploader (image ou vidéo)

#### Lister tous les médias
- **Méthode** : GET
- **URL** : `/media-management`
- **Réponse** : Liste de tous les médias

#### Supprimer un média
- **Méthode** : DELETE
- **URL** : `/media-management/:id`
- **Paramètres** :
    - `id` (Int32): Identifiant du média à supprimer

#### Mettre à jour un média
- **Méthode** : PUT
- **URL** : `/media-management/:id`
- **Paramètres** :
    - `id` (Int32): Identifiant du média à mettre à jour
    - Autres champs du média à mettre à jour

### Paramètres de veille et autres

#### Définir les paramètres
- **Méthode** : POST
- **URL** : `/settings`
- **Paramètres** :
    - `debutVeille` (String): Heure de début de la veille (format "HH:mm")
    - `finVeille` (String): Heure de fin de la veille (format "HH:mm")
    - `dureeDefilement` (Number): Durée d’affichage des pages camion en secondes
- **Réponse** : Paramètres de veille et de defilement mis à jour

#### Obtenir les paramètres actuels
- **Méthode** : GET
- **URL** : `/settings`
- **Réponse** : Plage horaire actuelle de veille et durée de défilement
