phantom.page.injectJs('HomePage.js');
phantom.page.injectJs('Categorie.js');

var HomePage = new HomePage();
var Categorie = new Categorie();


casper.test.begin('Connect to the home page', 1, function (test) {

  HomePage.accessPage();
  HomePage.checkPage();

  casper.run(function () {
    test.done();
  });
});

casper.test.begin('The creation of album should works as expected.', 4, function (test) {
  Categorie.accessPage();
  Categorie.checkPage();

  casper.run(function () {
    test.done();
  });
});
