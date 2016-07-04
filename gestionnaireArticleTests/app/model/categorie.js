//Méthode GET : récupére la liste des catégories
export function getAllCategories(res){
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

//Méthode GET : récupéré une catégorie par sa ressource (url)
export function getCategorie(ressource, res){
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

//Méthode GET : récupére l'ensemble des articles d'une catégorie
export function getArticlesForCategorie(ressource, res){
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

//Méthode POST : permet la création d'une nouvelle catégorie
export function ajouterCategorie(nom, description, image, ressource, res){
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
				res.send();
			}
		})

	});
}
