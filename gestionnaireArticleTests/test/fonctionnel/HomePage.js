function HomePage() {
    this.url = "http://localhost:8080/#/home";

    this.accessPage = function() {
        casper.start(this.url);
        return this;
    };

    this.checkPage = function() {
        casper.then(function() {
            casper.test.assertTextExists("Tutoriels de différentes technologies", 'Page accueil ok');
        });
        return this;
    };
}
