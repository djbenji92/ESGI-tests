function Article() {
    this.url = "http://localhost:8080/#/articles";

    this.accessPage = function() {
        casper.start(this.url);
        return this;
    };

    this.checkPage = function() {
        casper.then(function() {
            casper.test.assertTextExists("Liste des articles", 'Liste des categories');
        });
        return this;
    };
}
