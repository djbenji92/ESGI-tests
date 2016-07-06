//inclut Mongo sur le serveur
var mongoose = require('mongoose');
//Permet la connexion à mongo sur la base de données gestionnaireArticle
mongoose.connect('mongodb://localhost/gestionnaireArticle');

//Definit les tables de la base de données
var articleSchema=mongoose.Schema({
	idArticle:{type:Number},
	nomArticle:{type:String},
	descriptionArticle:{type:String},

	sousTitreArticle:{type:String},
	contenuArticle:{type:String},
	sousTitreArticle2:{type:String},
	contenuArticle2:{type:String},
	sousTitreArticle3:{type:String},
	contenuArticle3:{type:String},
	sousTitreArticle4:{type:String},
	contenuArticle4:{type:String},
	sousTitreArticle5:{type:String},
	contenuArticle5:{type:String},

	dateArticle:{type:Date},
	tagArticle:{type:String},
	_ressourceCategorie:{type:String}
});

var Article=mongoose.model('Article',articleSchema);

var categorieSchema=mongoose.Schema({
	idCategorie:{type:Number},
	nomCategorie:{type:String},
	descriptionCategorie:{type:String},
	imageCategorie:{type:String},
	ressourceCategorie:{type:String}
});

var Categorie=mongoose.model('Categorie', categorieSchema);

var adminSchema=mongoose.Schema({
	user:{type:String},
	password:{type:String}
})
var Admin=mongoose.model('Admin', adminSchema);

//Inclut d'autres librairies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');

//nclude functions
//import {getArticlesForCategorie} from 'app/model/categorie';

//Indique au serveur les dossier qu'il est capable de lire
app.use('/JavaScript', express.static(__dirname + '/app/javascript'));
app.use('/lib', express.static(__dirname + '/app/lib'));
app.use('/styles', express.static(__dirname + '/app/styles'));
app.use('/images', express.static(__dirname + '/app/images'));
app.use('/views', express.static(__dirname + '/app/views'));
app.use('/model', express.static(__dirname + '/app/model'));
//app.use(express.bodyParser());
app.use(bodyParser.json());
//Demarre l'application sur le fichier index
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/app/index.html');
});



//Definition d'un url du webservice
app.get('/api/articles', function(req, res) {
	getAllArticles(res);
});

function getAllArticles(res){
	//Recherche dans mongo db l'ensemble des articles
	Article.find(null)
	.exec(function(err,fiches){
		if (err==true){
			res.send('err');
		}
		else{
			//retourne l'ensemble des article sous forme de json
			res.json(fiches);
		}
	})
}

app.get('/api/article/:id', function(req, res) {
	//req.params permet d'aller chercher l'id dans l'url et de le recherche dans mongo
	var id = req.params.id;
	getArticle(id, res);
});

function getArticle(id, res){
	Article.find({idArticle:id})
	.exec(function(err,fiches){
		if (err==true){
			res.send('err');
		}
		else{
			res.json(fiches);
		}
	})
}

app.post('/api/addArticle', function(req,res) {
	//compte l'ensemble des articles pour incrémenter l'id (pas de suppression donc pas de probleme)

	var articleDB = req.body[1];
	var categorieDB = req.body[0];
	ajouterArticle(articleDB, categorieDB, res);
});

function ajouterArticle(articleDB, categorieDB, res){
	Article.count({} , function(err, count){
		var nombreArticle = count + 1;
		var dateArticle = new Date();

		var nouveauArticle=new Article({
			idArticle:nombreArticle,
			nomArticle:articleDB.nomArticle,
			descriptionArticle:articleDB.descriptionArticle,

			sousTitreArticle:articleDB.sousTitreArticle,
			contenuArticle:articleDB.contenuArticle,

			sousTitreArticle2:articleDB.sousTitreArticle2,
			contenuArticle2:articleDB.contenuArticle2,

			sousTitreArticle3:articleDB.sousTitreArticle3,
			contenuArticle3:articleDB.contenuArticle3,

			sousTitreArticle4:articleDB.sousTitreArticle4,
			contenuArticle4:articleDB.contenuArticle4,

			sousTitreArticle5:articleDB.sousTitreArticle5,
			contenuArticle5:articleDB.contenuArticle5,

			dateArticle:dateArticle,
			tagArticle:articleDB.tagArticle,
			_ressourceCategorie:categorieDB.ressourceCategorie
		});
		nouveauArticle.save(function(err){
			if (err){
				res.send('err');
			}
			else{
				res.send();
			}
		})

	});
}

//Categories
app.get('/api/categories', function(req, res) {
	getAllCategories(res);
});

function getAllCategories(res){
	Categorie.find(null)
	.exec(function(err,fiches){
		if (err==true){
			res.send('err');
		}
		else{
			res.json(fiches);
		}
	})
}

app.get('/api/categorie/:ressource', function(req, res) {
	var ressource = req.params.ressource;
	getCategorie(ressource, res);
});

function getCategorie(ressource, res){
	Categorie.find({ressourceCategorie:ressource})
	.exec(function(err,categorie){
		if (err==true){
			res.send('err');
		}
		else{
			res.json(categorie);
		}
	})
}

app.get('/api/articleByCategorie/:ressource', function(req, res) {
	var ressource = req.params.ressource;
	getArticlesForCategorie(ressource, res)
});

function getArticlesForCategorie(ressource, res){
	Article.find({_ressourceCategorie:ressource})
	.exec(function(err,articles){
		if (err==true){
			res.send('err');
		}
		else{
			res.json(articles);
		}
	})
}

app.post('/api/addCategorie', function(req,res) {
	var nom = req.body.nomCategorie;
	var description = req.body.descriptionCategorie;
	var image = req.body.imageCategorie;
	var ressource = req.body.ressource;

	ajouterCategorie(nom, description, image, ressource, res);

});

function ajouterCategorie(nom, description, image, ressource, res){
	Categorie.count({} , function(err, count){
		var nombreCategorie = count + 1;

		var nouvelleCategorie=new Categorie({
			idCategorie:nombreCategorie,
			nomCategorie:nom,
			descriptionCategorie:description,
			imageCategorie:image,
			ressourceCategorie:ressource
		});
		nouvelleCategorie.save(function(err){
			if (err){
				res.send('err');
			}
			else{

				res.send(nouvelleCategorie);
			}
		})

	});
}

//login
//non fonctionnel
app.post('/api/createUser', function(req, res){
	var mdp = req.body.password;

	var user = req.body[0];
	var password = req.body[1];
	//TEST CRYPTAGE
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	//FIN TEST
	var nouveauUser=new Admin({
		user:user,
		password:hash
	});
	nouveauUser.save(function(err){
		if (err){
			res.send('err');
		}
		else{
			res.send('');
		}
	})


	//stocker dans la db
});

app.post('/api/connexion', function(req, res){
	//var mdp = req.body.user;
	//var mdpCrypter = bcrypt.compareSync(mdp, hash);

	//verifier dans la db si trouve mdp et user

	//créer cookie

	//TEST
	//var user = req.body.
	var user = req.body[0];
	var password = req.body[1];

	//Admin.find({'user':user, 'password':password})
	Admin.count({'user':user, 'password':password})
	.exec(function(err,user){
		if (err==true){
			res.send('err');
		}
		else{
			//console.log('user trouvé');
			console.log(user);
			res.json(user);
		}
	})


	//console.log(user + ' ' + password);


});
//

app.get('*', function(req, res) {
    res.redirect('/');
});

console.log("Pour visionner l'application rendez-vous à l'url : localhost:8080");
app.listen(8080);
