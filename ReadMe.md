<H1>BOIREAU_GUY_API_NOSQL</H1>

Fonctionnalités
Liste des fonctionnalités principales de l'API :

Connexion et authentification des utilisateurs
Ajout, modification et suppression de commandes
Ajout, modification et suppression de menus
Récupération de toutes les commandes d'un utilisateur
Récupération de tous les utilisateurs
Mise à jour des informations utilisateur
Technologies utilisées
MongoDB
Node.js

Installation
Clonez ce repo

git clone https://github.com/guyboireau/Api_Nosql
Installez les packages NPM

npm install
Créez un fichier .env avec les informations de configuration requises

makefile
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=mysecret
Lancez le serveur

Installation
Cloner ce dépôt de code
Installer les dépendances : npm install
Renommer le fichier .env.example en .env
Configurer les variables d'environnement dans le fichier .env
Lancer l'application : npm start


npm start
Utilisation
Exemples d'utilisation des différentes routes de l'API :



Menus

POST /menu/add : ajouter un menu (nécessite une authentification JWT)

GET /menus : récupérer tous les menus

PUT /menu/update/:id : mettre à jour un menu (nécessite une authentification JWT)

DELETE /menu/delete/:id : supprimer un menu (nécessite une authentification JWT)

GET /searchMenu/search : rechercher des menus qui correspondent à une chaîne de 
recherche

GET /menu/:id : récupérer un menu par son ID

Commandes

POST /commande/add : ajouter une commande

GET /commandes : récupérer toutes les commandes

PUT /commande/update/:id : mettre à jour une commande (nécessite une authentification JWT)

DELETE /commande/delete/:id : supprimer une commande (nécessite une authentification JWT)

GET /commande/:id : récupérer une commande par son ID


Authentification

POST /user/signin : inscription

POST /user/login : connexion

GET /user/signout : déconnexion (nécessite une authentification JWT)

GET /user/users : récupérer tous les utilisateurs (nécessite une authentification JWT)

PUT /user/update/:id : mettre à jour un utilisateur (nécessite une authentification JWT)

