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
          mongoose.connection.db.dropDatabase();
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

  var ressource = ["ressourceMocha"];
  var article = {"nomArticle":"Mon article angular JS", "descriptionArticle":"Insertion dans la base de données du premier article", "sousTitreArticle":"Sous titre de l'article", "contenuArticle":"Contenu de l'article", "tagArticle":"testArticle"};
  var categorie = {"ressourceCategorie":"ressourceMocha"};
  var tab = [categorie, article];

  describe("create an article", function() {
    it("return an object in response", function(done) {
      chai.request(app)
      .post('/api/addArticle')
       //.send({"ressource":"ressourceMocha"},{"nomArticle":"Mon article angular JS", "descriptionArticle":"Insertion dans la base de données du premier article", "sousTitreArticle":"Sous titre de l'article", "contenuArticle":"Contenu de l'article", "tagArticle":"testArticle"})
       .send(tab)
       .end(function(err, res){
          //console.log(res.body);
          res.body.nomArticle.should.equal("Mon article angular JS");
          res.body.descriptionArticle.should.equal("Insertion dans la base de données du premier article");
          res.body.sousTitreArticle.should.equal("Sous titre de l'article");
          res.body.contenuArticle.should.equal("Contenu de l'article");
          res.body.tagArticle.should.equal("testArticle");
          res.body._ressourceCategorie.should.equal("ressourceMocha");
          done();
        })

    });
  });

  describe("show an article", function() {
    it('should test getArticle', function(done) {
      chai.request(app)
        .get('/api/article/1', function(req,res){
          getArticle(1, res);
        })
        .end(function(err, res){
          console.log(res.body[0]);
          res.should.have.status(200);
          res.body[0].nomArticle.should.equal("Mon article angular JS");
          res.body[0].descriptionArticle.should.equal("Insertion dans la base de données du premier article");
          res.body[0].sousTitreArticle.should.equal("Sous titre de l'article");
          res.body[0].tagArticle.should.equal("testArticle");

          done();
        });
    });
  });


  describe("show a categorie", function() {
    it('should show categorie 1', function(done) {
      chai.request(app)
        .get('/api/categorie/ressourceMocha')
        .end(function(err, res){
          res.should.have.status(200);
          res.body[0].nomCategorie.should.equal("Mocha Test");
          res.body[0].descriptionCategorie.should.equal("test insertion categorie Mocha");
          res.body[0].imageCategorie.should.equal("imageMocha");
          res.body[0].ressourceCategorie.should.equal("ressourceMocha");
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

  //Suppression de l'article et de la categorie
  var tabIdArticle= [1];

  describe("delete an article", function() {
    it("return validation suppression", function(done) {
      chai.request(app)
      .post('/api/article/deleteArticle')
      .send(tabIdArticle)
       .end(function(err, res){
          res.text.should.equal("Article supprimé");
          done();
        })

    });
  });

  //delete categorie
  describe("delete a categorie", function() {
    it("return validation suppression", function(done) {
      chai.request(app)
      .post('/api/deleteCategorie')
      .send(ressource)
       .end(function(err, res){
          res.text.should.equal("Catégorie supprimée");
          done();
        })

    });
  });

  //
});
