//Méthode GET : Renvoie l'ensemble des articles de la base de deonnées
export function getAllArticles(res){
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

//Méthode GET : Récupéree un article dans la base de données
export function getArticle(id, res){
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


//Méthode POST : Ajoute un article dans la base de données
export function ajouterArticle(articleDB, categorieDB, res){
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
