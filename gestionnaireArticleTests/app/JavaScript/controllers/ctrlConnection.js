function ctrlConnection($scope, $http){
	//$scope.logIn=function(email, mdp){
	$scope.logIn=function(){
		//alert("email : " + email + " mdp : " +  mdp);
		$http.post('/api/connexion', [$scope.email, $scope.password])
		.success(function(data){
			if (data!='err'){
				//alert('Utilisateur crée !');
				if(data == 1){
					//créer session
					console.log("utilisateur connecté");
				}
				else {
					console.log('l utilisateur n a pas été trouver');
				}
			}
			else {
				alert('err');
			}
		})

		
	}

}