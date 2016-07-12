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

casper.test.begin('The creation of album should works as expected.', 1, function (test) {
  Categorie.accessPage();
  Categorie.checkPage();

  casper.run(function () {
    test.done();
  });
});

casper.test.begin('The creation of album should works as expected.', 1, function (test) {
  Article.accessPage();
  Article.checkPage();

  casper.run(function () {
    test.done();
  });
});
