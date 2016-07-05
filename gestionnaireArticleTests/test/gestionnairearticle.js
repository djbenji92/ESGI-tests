var expect    = require("chai").expect;
var request = require("request");
var url = "http://localhost:8080/#/articles";

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
});