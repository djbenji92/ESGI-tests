//var casper = require('casper').create();


function HomePage() {
    this.url = "http://localhost:8080/#/home";

    this.accessPage = function() {
        casper.start(this.url);
        return this;
    };

    this.checkPage = function() {
        casper.then(function() {
            casper.test.assertTextExists("Tutoriels de différentes technologies", 'Node JS');
        });
        return this;
    };
}

//casper.run();

/*
casper.test.begin("Hello, Test!", 1, function(test) {
  test.assert(true);
  test.done();
});*/
