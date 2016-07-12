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

    this.urlCreate = "http://localhost:8080/#/createArticle";

    this.accessPageCreateArticle = function() {
        casper.start(this.urlCreate);
        return this;
    };

    this.checkPageCreateArticle = function() {
        casper.then(function() {
            casper.test.assertTextExists("Créer un article", 'page de création des articles');
        });
        return this;
    };

    this.createArticle = function(nom, desc, titre1, content1, titre2, content2, titre3, content3, titre4, content4, titre5, content5, tag) {
      casper.start(this.urlCreate);
      casper.then(function() {
        this.fillSelectors('#createArticle', {
            '#nomArticle' : nom,
            '#descriptionArticle': desc,
            '#t1': titre1,
            '#content1': content1,
            '#t2': titre2,
            '#content2': content2,
            '#t3': titre3,
            '#content3': content3,
            '#t4': titre4,
            '#content4': content4,
            '#t5': titre5,
            '#content5': content5,
            '#tagArticle': tag
        }, false);
      });

      casper.then(function(){
        this.evaluate(function() {
            document.querySelector('#idCat').selectedIndex = 1;
        });
      });

      casper.then(function() {
          this.click('#enregistreArticle');
      });

      casper.then(function success() {
          casper.waitForUrl(/article/, function () {
              casper.echo('L article a été posté', 'TRACE');
          });
        }, function failure() {
        casper.test.fail('Echec de la redirection sur l article');
      });

    return this;
  };
}
