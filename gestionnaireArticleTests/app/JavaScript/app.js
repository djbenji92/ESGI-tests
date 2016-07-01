var monApp =angular.module('gestionnaireArticle',['ngRoute']);

monApp.config(function($routeProvider){
	$routeProvider
	//definir une url, et associer une vue
	.when('/home',{templateUrl:'views/home.html'})
	.when('/articles',{templateUrl:'views/articles.html'})
	.when('/article/:id',{templateUrl:'views/article.html'})
	.when('/createArticle',{templateUrl:'views/createArticle.html'})
	.when('/createCategorie',{templateUrl:'views/createCategorie.html'})
	//V2
	.when('/categories',{templateUrl:'views/categories.html'})
	.when('/categorie/:ressource',{templateUrl:'views/categorie.html'})
	.when('/articlesRecents',{templateUrl:'views/articlesRecent.html'})
	.when('/angularjs',{templateUrl:'views/menu/angularjs.html'})
	.when('/nodejs',{templateUrl:'views/menu/nodejs.html'})
	.when('/mongodb',{templateUrl:'views/menu/mongodb.html'})
	.when('/php',{templateUrl:'views/menu/php.html'})
	.when('/mysql',{templateUrl:'views/menu/mysql.html'})
	.when('/divers',{templateUrl:'views/menu/divers.html'})
	//admin
	.when('/admin/login',{templateUrl:'views/login.html'})

	.otherwise({redirectTo:'/home'});
})
