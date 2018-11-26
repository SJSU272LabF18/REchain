var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should have status 200 ", function(done) {
  this.timeout(10000);
  chai
    .request("http://localhost:3001")
    .get("/home/search")
    .send({
      email: "kavyamohan.sahai@sjsu.edu"
    })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});
