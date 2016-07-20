var chai = require("chai");
var chaiHttp = require('chai-http');

var baseUrl = 'http://localhost:8080';
var mongoose = require('mongoose');

var app = require('../app');

var should = chai.should();

chai.use(chaiHttp);


describe("Gestionnaire article", function() {

  before(function(done) {
      mongoose.connect('mongodb://localhost/gestionnaireArticle', function(){
          mongoose.connection.db.dropDatabase(function(){
              done();
          });
          done();
      });
  });


  after(function(done) {
      //mongoose.connection.db.dropDatabase();
      mongoose.connection.close();
      done();
  });

  describe("create a categorie", function() {
    it("return an object in response", function(done) {
      chai.request(app)
      .post('/api/addCategorie')
       .send({"nomCategorie":"Mocha Test", "descriptionCategorie":"test insertion categorie Mocha", "imageCategorie":"imageMocha", "ressource":"ressourceMocha"})
       .end(function(err, res){
          //console.log(res);
          res.body.nomCategorie.should.equal("Mocha Test");
          res.body.descriptionCategorie.should.equal("test insertion categorie Mocha");
          res.body.imageCategorie.should.equal("imageMocha");
          res.body.statutCategorie.should.equal("create");
          res.body.ressourceCategorie.should.equal("ressourceMocha");
          done();
        })

    });
  });

  var article = {"nomArticle":"Mon article angular JS", "descriptionArticle":"Insertion dans la base de données du premier article", "sousTitreArticle":"Sous titre de l'article", "contenuArticle":"Contenu de l'article", "tagArticle":"testArticle"};
  var categorie = {"ressource":"ressourceMocha"};
  var tab = [categorie, article];

  describe("create an article", function() {
    it("return an object in response", function(done) {
      chai.request(app)
      .post('/api/addArticle')
       //.send({"ressource":"ressourceMocha"},{"nomArticle":"Mon article angular JS", "descriptionArticle":"Insertion dans la base de données du premier article", "sousTitreArticle":"Sous titre de l'article", "contenuArticle":"Contenu de l'article", "tagArticle":"testArticle"})
       .send(tab)
       .end(function(err, res){
          console.log(res.body);
          /*res.body[0].nomArticle.should.equal("Mon article angular JS");
          res.body[0].descriptionArticle.should.equal("Insertion dans la base de données du premier article");
          res.body[0].sousTitreArticle.should.equal("Sous titre de l'article");
          res.body[0].contenuArticle.should.equal("Contenu de l'article");
          res.body[0].tagArticle.should.equal("testArticle");
          res.body[0]._ressourceCategorie.should.equal("ressourceMocha");*/
          done();
        })

    });
  });

  describe("show an article", function() {
    it('should test getArticle', function(done) {
      chai.request(app)
        .get('/#/article/1', function(req,res){
          getArticle(1, res);
        })
        .end(function(err, res){
          res.should.have.status(200);
          /*res.body[0].idArticle.should.equal(1);
          res.body[0].nomArticle.should.equal('Mon article angular JS')
          res.body[0].descriptionArticle.should.equal('Insertion dans la base de données du premier article')
          */done();
        });
    });
  });


  describe("show a categorie", function() {
    it('should show categorie 2', function(done) {
      chai.request(app)
        .get('/#/categorie/angularjs')
        .end(function(err, res, body){
          console.log(body);
          res.should.have.status(200);

          done();
        });
    });
  });

  it('should list ALL articles', function(done) {
    chai.request(app)
      .get('/#/articles')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});
