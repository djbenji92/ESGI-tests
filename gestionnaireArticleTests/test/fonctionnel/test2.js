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

casper.test.begin('Creation de catégorie', 2, function (test) {
  Categorie.accessPageCreateCategorie();
  Categorie.checkPageCreateCategorie();
  Categorie.createCategorie('CasperJS', 'Bienvenue dans la catégorie CasperJS', 'casperjs.png', 'testCasperJS');

  casper.run(function () {
    test.done();
  });
});

casper.test.begin('Pages des articles', 1, function (test) {
  Article.accessPage();
  Article.checkPage();

  casper.run(function () {
    test.done();
  });
});

casper.test.begin('Creation article', 16, function (test) {
  Article.accessPageCreateArticle();
  Article.checkPageCreateArticle();
  Article.createArticle('Test ajoutArticle', 'Test description article', 'Test titre1', 'Test contenu1', 'part2', 'content2', 'part3', 'content3', 'part4', 'content4', 'part5', 'content5', 'testCategorie' );

  casper.run(function () {
    test.done();
  });
});
