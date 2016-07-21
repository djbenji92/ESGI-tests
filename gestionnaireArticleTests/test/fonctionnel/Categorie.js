function Categorie() {
    //Accéder à l'ensemble des categories
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

    //Accédr à la page d'insertion de categorie
    this.urlCreateCategorie = "http://localhost:8080/#/createCategorie";

    this.accessPageCreateCategorie = function() {
        casper.start(this.urlCreateCategorie);
        return this;
    };

    this.checkPageCreateCategorie = function() {
        casper.then(function() {
            casper.test.assertTextExists("Créer une catégorie", 'page de création de categorie');
        });
        return this;
    };

    this.createCategorie = function(nom, desc, image, ressource) {
        casper.start(this.urlCreateCategorie);
        casper.then(function() {
            this.fillSelectors('#createCategorie', {
                '#nomCategorie' : nom,
                '#descCategorie': desc,
                '#nomImageCategorie': image,
                '#ressourceCategorie': ressource
            }, false);
        });

        casper.then(function() {
            this.click('#enregistreCategorie');
        });

        casper.then(function success() {
            casper.waitForUrl(/categorie/, function () {
                casper.echo('La categorie a été posté', 'TRACE');
            });
        }, function failure() {
            casper.test.fail('Echec de la redirection sur la categorie');
        });

        casper.then(function() {
            casper.test.assertTextExists('Articles :', 'page de la categorie');
        });

        casper.start(this.url);
        casper.then(function() {
          casper.test.assertTextExists(nom, 'affichage du nom de categorie');
          casper.test.assertTextExists(desc, 'affichage de la description de categorie');
        });

        //
        casper.then(function() {
          this.click('#deleteCategorie');
        });

        casper.then(function success() {
            casper.waitForUrl(/categories/, function () {
                casper.echo('La catégorie a été supprimé', 'TRACE');
            });
          }, function failure() {
          casper.test.fail('Echec de la redirection sur la page des catégories');
        });
        casper.then(function() {
          casper.test.assertTextExists("Liste des categories", 'verif titre de la page');

          casper.test.assertTextDoesntExist(nom, "nom n'existe plus");
          casper.test.assertTextDoesntExist(desc, "description n'existe plus");
        });
        //

        return this;
    };

}
