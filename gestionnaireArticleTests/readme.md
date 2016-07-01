Technologies utilisées:
Node.js
Angular JS
Mongo DB

///////////////////DEMARRER L'APPLICATION//////////////////////////////////////////
Avant de lancer le projet, démarrer le serveur mondo :
sudo mongod

Si c'est la première fois que vous lancer le projet faire les commandes suivantes :
mongo
use gestionnaireArticle

Pour lancer le serveur :
node app.js (mac) ou nodejs app.js (ubuntu)

Si pas d'erreur aller sur l'url localhost:8080


////////////TUTO DE BASE MONGO/////////////////////////////////////////////////

se connecter : mongo
visionner les bases de données : show dbs
créer ou séléction une BDD : use nomBDD
visionner les tables (appeler collection sous mongo) : show collections

requête SELECT
db.nomTable.find()
ex: db.articles.find()
(CONSEIL : pour rendre le contenu plus lisible faire db.articles.find().pretty() )

REQUETE WHERE
db.nomTable.find(nomChamp: valeurRecherché)
ex: db.articles.find({idArticle:18}).pretty()

///////////////////////FICHIER IMPORTANT/////////////////////////////////
app.js : configuration du serveur ou on retrouve le webservice, ex: app.get (URL de requete GET), app.post (URL de requete POST)

app/JavaScript/app.js
Système de routage de angular JS

app/JavaScript/controllers/
Intéraction avec les webservices (exemple dans ctrlArticle.js)

app/views/index.html
angular js = one page donc c'est ici que l'on va passer tous les fichier à utiliser dans le front
