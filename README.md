# MyMéteo (Angular / Typescript)

Ce projet est une application web basée sur Angular avec une partie back-end écrite en TypeScript.

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/ThoRibeiro/MyMeteo.git
   cd MyMeteo
   ```

2. **Installer les dépendances du back-end**

   Assurez-vous d'avoir Node.js et npm installés. Exécutez ensuite les commandes suivantes :

   ```bash
   cd back-end
   npm install
   ```

3. **Installer les dépendances du front-end**

   ```bash
   cd front-end
   npm install
   ```

## Configuration

1. **Configurer le back-end**

   Dans le dossier `back-end`, vous allez retrouvé toute la couche avec les appels APIs

2. **Configurer le front-end**

   Dans le dossier `front-end/src/` ?

## Exécution

1. **Lancer le back-end**

   Dans le dossier `back-end`, exécutez la commande suivante pour démarrer le serveur :

   ```bash
   npm dev
   ```

   Le back-end sera accessible à l'adresse http://localhost:3000 par défaut.

2. **Lancer le front-end**

   Dans le dossier `front-end`, exécutez la commande suivante pour démarrer l'application Angular :

   ```bash
   ng serve
   ```

   L'application sera accessible à l'adresse http://localhost:4200 par défaut.

## Structure des dossiers

- **back-end**: Contient le code source du serveur back-end écrit en TypeScript.
  - `/src`: Contient les fichiers sources du projet back-end.
  - `/dist`: Contient les fichiers transpilés et prêts pour l'exécution.

- **front-end**: Contient le code source de l'application front-end Angular.
  - `/src`: Contient les fichiers sources du projet front-end.
  - `/dist`: Contient les fichiers construits prêts à être déployés.
