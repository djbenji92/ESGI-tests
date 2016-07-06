var expect    = require("chai").expect;
var request = require("request");
var url = "http://localhost:8080/#/articles";
var urlCreateCategorie = "http://localhost:8080/api/addCategorie";

describe("Gestionnaire article", function() {
  describe("test simple addition", function() {
    it("add numbers", function() {
      expect(1+1).to.equal(2);
    });
  });

  describe("get all article", function() {
    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });
  });

  //A revoir
  /*describe("create a categorie", function() {
    it("return an object in response", function(done) {
        request.post({url:urlCreateCategorie , form:{"nomCategorie":"Mocha Test", "descriptionCategorie":"test insertion categorie Mocha", "imageCategorie":"imageMocha", "ressourceCategorie":"ressourceMocha"}}, function(error, response, body){
          response.body.nomCategorie.should.equal("Mocha Test");
          response.body.descriptionCategorie.should.equal("test insertion categorie Mocha");
          response.body.imageCategorie.should.equal("imageMocha");
          response.body.ressourceCategorie.should.equal("ressourceMocha");
        })
    });
  });*/

  describe("show categories", function() {
    it("return an object in response", function(done) {
        request({url:"http://localhost:8080/api/categorie/angularjs"}, function(error, response, body){

          /*var obj = JSON.parse(body);
          console.log(obj[0].idCategorie);
          console.log(JSON.parse(body)[0].idCategorie);*/
          expect(JSON.parse(body)[0].idCategorie).to.equal(1);
          expect(JSON.parse(body)[0].nomCategorie).to.equal("Angular JS");
          expect(JSON.parse(body)[0].descriptionCategorie).to.equal("A travers cette section vous allez pouvoir comprendre de nombreux mécanismes de angular JS");
          expect(JSON.parse(body)[0].imageCategorie).to.equal("icon-angularjs.png");
          expect(JSON.parse(body)[0].ressource).to.equal("angularjs");
          expect(JSON.parse(body)[0].ressourceCategorie).to.equal("angularjs");
          done();

        })
    });
  });
});
