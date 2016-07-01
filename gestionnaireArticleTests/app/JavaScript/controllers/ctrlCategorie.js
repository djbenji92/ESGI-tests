function ctrlCategorie($scope,$http){
	$scope.affiche=function(){
		$http.get('/api/categories')
		.success(function(data){
			if (data!='err'){
				$scope.listeCategorie=data;
			}
		})
	}

	$scope.enregistrerCategorie=function(){
		$http.post('/api/addCategorie',$scope.categorie)
		.success(function(data){
			if (data=='err'){
				alert("Désolé un problème est survenu lors de l'enregistrement");
			}
			else{
				$scope.categorie={};
				//$scope.affiche();
				alert("enregistrement effectué ! Good code :)");
			}
		})
	}
	$scope.affiche();
	
}

function getCategorie($scope, $routeParams, $rootScope, $http) {
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
};