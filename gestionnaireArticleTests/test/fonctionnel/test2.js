phantom.page.injectJs('HomePage.js');

var HomePage = new HomePage();

casper.test.begin('Connect to the home page', 1, function (test) {

  HomePage.accessPage();
  HomePage.checkPage();

  casper.open('http://www.esgi.fr/existepas');

  casper.run(function () {
    test.done();
  });
});
