# Documentation de l'Application Truck Display

## Introduction
L'Application Truck Display est une application développée avec React et Electron, destinée à gérer les affichages de camions et de médias.

## Table des Matières
1. [Installation](#installation)
2. [Architecture](#architecture)
3. [Composants Principaux](#composants-principaux)
4. [Utilisation](#utilisation)
5. [Déploiement](#déploiement)

## Installation <a name="installation"></a>
Pour installer l'application, suivez les étapes suivantes:
```sh
# Clonez le dépôt
git clone https://github.com/MatthieuDeroir/AGCO.git

# Accédez au dossier du projet
cd AGCO

# Installez les dépendances
npm install

# Démarrez l'application
npm start
```

# Architecture <a name="architecture"></a>

L'architecture de l'application est divisée en plusieurs parties:

    - React Components: Ils définissent l'interface d'affichage et la logique de l'application.
    - Electron Main Process: Il sert de backend et gère les fenêtres de l'application.
    - Services: Ils interagissent avec l'API pour récupérer, envoyer et manipuler les données.

# Composants Principaux <a name="composants-principaux"></a>

* App

Le composant racine de l'application, il gère l'état global de l'application et contient les composants TruckList et MediaDisplay.

* TruckList

Il gère l'affichage de la liste des camions.
* MediaDisplay

Il gère l'affichage des médias.
# Utilisation <a name="utilisation"></a>

L'application est intuitive et facile à utiliser. Les administrateurs ont la possibilité de gérer les camions et les médias via les points d'accès de l'API.

# Déploiement <a name="déploiement"></a>

Pour déployer l'application, exécutez les commandes suivantes:


````sh

# Construisez l'application
npm run build

# Emballez l'application avec Electron
npm run package

````

L'application emballée sera disponible dans le dossier release.

# Conclusion

L'Application Truck Display permet une gestion efficace des affichages de camions et de médias, avec une interface utilisateur intuitive et des fonctionnalités robustes.

