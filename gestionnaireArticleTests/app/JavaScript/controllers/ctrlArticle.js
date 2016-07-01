function ctrlArticle($scope,$http){
	$scope.affiche=function(){
		$http.get('/api/articles')
		.success(function(data){
			if (data!='err'){
				$scope.listeArticles=data;
			}
		})
	}

	$scope.enregistrerArticle=function(){
		console.log([$scope.filterCategorie, $scope.article]);
		$http.post('/api/addArticle', [$scope.filterCategorie, $scope.article])
		.success(function(data){
			if (data=='err'){
				alert("Désolé un problème est survenu lors de l'enregistrement");
			}
			else{
				$scope.article={};
				//$scope.affiche();
				alert("enregistrement effectué ! Good code :)");
			}
		})
	}

	$scope.getCategories=function(){
		$http.get('/api/categories')
		.success(function(data){
			if (data!='err'){
				$scope.listeCategorie=data;
				$scope.filterCategorie=$scope.listeCategorie[0];;
			}
		})
	}
	$scope.affiche();
	$scope.getCategories();

	//v2
	var nbPartie = 0;
	$scope.btnAddPartie = true;
	$scope.addPartieArticle=function(){
		
		nbPartie = nbPartie + 1;
		$scope.nbPartie = nbPartie;

		if(nbPartie == 4){
			$scope.nbPartie = 4;
		}

	}
}

function getArticle($scope, $routeParams, $rootScope, $http) {
	$scope.afficheArticle=function(){
		//alert($routeParams.id);
		var urlGet = '/api/article/' + $routeParams.id;
		//alert(urlGet);

		$http.get(urlGet)
		.success(function(data){
			if (data!=='err'){
				$scope.article=data;
			}
		})
	}
	$scope.afficheArticle();
};

function toggle($scope){
	$scope.stateToggle = false;
	$scope.afficheToggle = function() {
		if($scope.stateToggle == false){
			$scope.stateToggle = true;
		}
		else {
			$scope.stateToggle = false;
		}
		
	}
}

function getCategorie($scope, $routeParams, $rootScope, $http){
	
}

function getArticlesByCategorie($scope, $routeParams, $rootScope, $http){
	$scope.afficheCategorie=function(){
		//alert($routeParams.id);
		var urlGet = '/api/categorie/' + $routeParams.ressource;
		//alert(urlGet);

		$http.get(urlGet)
		.success(function(data){
			if (data!=='err'){
				$scope.categorie=data;
			}
		})
	}
	$scope.afficheCategorie();

	$scope.afficheArticlesByCategorie=function(){
		//alert($routeParams.id);
		var urlGet = '/api/articleByCategorie/' + $routeParams.ressource;
		//alert(urlGet);

		$http.get(urlGet)
		.success(function(data){
			if (data!=='err'){
				$scope.articles=data;
			}
		})
	}
	$scope.afficheArticlesByCategorie();
}

function search($scope, $http){
		$http.get('/api/articles')
			.success(function(data){
				if (data!='err'){
					$scope.articles=data;
				}
			})

		
		$scope.afficheSearch = false;
		$scope.search=function(){
			$scope.afficheSearch = true;
			console.log("recherche lancé");
		}
		
		
}


//v2
//var nbPartie = 0;

/*var nbPartie = 0;
function addPartieArticle($scope){
	
	nbPartie = nbPartie + 1;
	alert(nbPartie);
	$scope.nbPartie = nbPartie;

}*/


