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
				console.log(data.ressourceCategorie);
				$scope.categorie={};
				//$scope.affiche();
				//alert("enregistrement effectué");
				document.location.href="http://localhost:8080/#/categorie/" + data.ressourceCategorie;
			}
		})
	}
	$scope.affiche();

	$scope.deleteCategorie = function(){
		var url = "/api/deleteCategorie/" + $routeParams.ressource;

		$http.post('/api/deleteCategorie', [$routeParams.ressource])
		.success(function(data){
			if (data=='err'){
				alert("Désolé un problème est survenu lors de l'enregistrement");
			}
			else{
				console.log('suppression terminé');
				document.location.href="http://localhost:8080/#/categories";
			}
		})
	}

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
