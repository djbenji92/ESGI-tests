function Categorie() {
    this.url = "http://localhost:8080/#/categories";

    this.accessPage = function() {
        casper.start(this.url);
        return this;
    };

    this.checkPage = function() {
        casper.then(function() {
            casper.test.assertTextExists("Liste des categories", 'Liste des categories');
        });
        return this;
    };
}
