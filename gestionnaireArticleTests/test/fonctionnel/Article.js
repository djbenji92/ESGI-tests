function Article() {
    this.url = "http://localhost:8080/#/articles";

    this.accessPage = function() {
        casper.start(this.url);
        return this;
    };

    this.checkPage = function() {
        casper.then(function() {
            casper.test.assertTextExists("Liste des articles", 'Liste des articles');
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

      casper.then(function() {
        casper.test.assertTextExists(nom, 'affiche nom article');
        casper.test.assertTextExists(desc, 'affiche description article');
        casper.test.assertTextExists(titre1, 'affiche titre1 article');
        casper.test.assertTextExists(content1, 'affiche contenu1 article');
        casper.test.assertTextExists(titre2, 'affiche titre2 article');
        casper.test.assertTextExists(content2, 'affiche contenu2 article');
        casper.test.assertTextExists(titre3, 'affiche titre3 article');
        casper.test.assertTextExists(content3, 'affiche contenu3 article');
        casper.test.assertTextExists(titre4, 'affiche titre4 article');
        casper.test.assertTextExists(content4, 'affiche contenu4 article');
        casper.test.assertTextExists(titre5, 'affiche titre5 article');
        casper.test.assertTextExists(content5, 'affiche contenu5 article');
      });

    return this;
  };
}
