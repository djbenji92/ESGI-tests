var chai = require("chai");
var chaiHttp = require('chai-http');

var baseUrl = 'http://localhost:8080';
var mongoose = require('mongoose');
var app = require('../app');

var should = chai.should();

chai.use(chaiHttp);


describe("Gestionnaire article", function() {

  describe("create a categorie", function() {
    it("return an object in response", function(done) {
      chai.request(app)
      .post('/api/addCategorie')
       .send({"nomCategorie":"Mocha Test", "descriptionCategorie":"test insertion categorie Mocha", "imageCategorie":"imageMocha", "ressourceCategorie":"ressourceMocha"})
       .end(function(err, res){
          console.log(res);
          res.body.nomCategorie.should.equal("Mocha Test");
          res.body.descriptionCategorie.should.equal("test insertion categorie Mocha");
          res.body.imageCategorie.should.equal("imageMocha");
          done();
        })
        
    });
  });
    
  describe("show an article", function() { 
    it('should test getArticle', function(done) {
      chai.request(app)
        .get('/api/article/2', function(req,res){
          getArticle(2, res);
        })
        .end(function(err, res){
          res.should.have.status(200);
          res.body[0].idArticle.should.equal(2);
          res.body[0].nomArticle.should.equal('Mon article angular JS')
          res.body[0].descriptionArticle.should.equal('Insertion dans la base de données du premier article')
          done();
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
