var chai = require("chai");
var chaiHttp = require('chai-http');
//var expect    = chai.expect;
//var request = require("request");
//var baseUrl = 'http://localhost:8080';
var mongoose = require('mongoose');
var app = require('../app');
//var Article = require("../app/model/article");

var should = chai.should();

chai.use(chaiHttp);


describe("Gestionnaire article", function() {
 beforeEach(function(done){
    var testArticle1 = {
      idArticle:'3',
      nomArticle:'test nom article',
      descriptionArticle:'test description',

      sousTitreArticle:'test sous titre article',
      contenuArticle:'test contenu article',

      sousTitreArticle2:'test sous titre article 2',
      contenuArticle2:'test contenu article 2',

      sousTitreArticle3:'test sous titre article 3',
      contenuArticle3:'test contenu article 3',

      sousTitreArticle4:'test sous titre article 4',
      contenuArticle4:'test contenu article 4',

      sousTitreArticle5:'test sous titre article 5',
      contenuArticle5:'test contenu article 5',

      dateArticle:'2016-01-06T17:27:03.675Z',
      tagArticle:'test tag',
      //_ressourceCategorie:'test Resource Categorie'
    };
    var testCategorie1 = {
      idCategorie:'3',
      nomCategorie:'test Nom Categorie',
      descriptionCategorie:'test description Categorie',
      imageCategorie:'tes image',
      ressourceCategorie:'test ressource categorie'
    };
    //console.log(app);
    chai.request(app)
      .post('/api/addArticle', function(req,res){
        ajouterArticle(testArticle1, testCategorie1, res);
      })
      
      done();
  });
    
  
  it('should test getArticle', function(done) {
    chai.request(app)
      .get('/api/article/2', function(req,res){
        getArticle(2, res);
      })
      .end(function(err, res){
        res.should.have.status(200);
        console.log(res);
        res.body[0].idArticle.should.equal(2);
        
        done();
      });
  });
  /*
  
  it('should add a SINGLE blob on /blobs POST', function(done) {
    chai.request(app)
      .post('/blobs')
      .send({'name': 'Java', 'lastName': 'Script'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('lastName');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Java');
        res.body.SUCCESS.lastName.should.equal('Script');
        done();
      });
  });

  */
  it('should show categorie 2', function(done) {
    chai.request(app)
      .get('/#/categorie/angularjs')
      .end(function(err, res){
        res.should.have.status(200);
        
        /*res.body[0].idCategorie.should.equal("2");
        res.body[0].nomCategorie.should.equal("Angular JS");
        res.body[0].descriptionCategorie.should.equal("A travers cette section vous allez pouvoir comprendre de nombreux mécanismes de angular JS");
        res.body[0].imageCategorie.should.equal("icon-angularjs.png");
        res.body[0].ressourceCategorie.should.equal("angularjs");*/
        done();
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
