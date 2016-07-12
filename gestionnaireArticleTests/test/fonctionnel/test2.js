phantom.page.injectJs('HomePage.js');
phantom.page.injectJs('Categorie.js');
phantom.page.injectJs('Article.js');

var HomePage = new HomePage();
var Categorie = new Categorie();
var Article = new Article();


casper.test.begin('Connect to the home page', 1, function (test) {

  HomePage.accessPage();
  HomePage.checkPage();

  casper.run(function () {
    test.done();
  });
});

casper.test.begin('Page des categories', 1, function (test) {
  Categorie.accessPage();
  Categorie.checkPage();
  casper.run(function () {
    test.done();
  });
});

casper.test.begin('Creation de catégorie', 1, function (test) {
  Categorie.accessPageCreateCategorie();
  Categorie.checkPageCreateCategorie();
  Categorie.createCategorie('CasperJS', 'Bienvenue dans la catégorie CasperJS', 'casperjs.png', 'testCasperJS');

  casper.run(function () {
    test.done();
  });
});

casper.test.begin('tests des articles', 1, function (test) {
  Article.accessPage();
  Article.checkPage();

  casper.run(function () {
    test.done();
  });
});

casper.test.begin('Creation article', 1, function (test) {
  Article.accessPageCreateArticle();
  Article.checkPageCreateArticle();
  Article.createArticle('Tutoriel CasperJS', 'A travers ce tutoriel blablabla', 'Faire un test', 'blabla', 'part2', 'content2', 'part3', 'content3', 'part4', 'content4', 'part5', 'content5', 'casperjs' );

  casper.run(function () {
    test.done();
  });
});
