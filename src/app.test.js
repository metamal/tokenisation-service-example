const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Tokenization Service', () => {
  describe('GET /', () => {
    it('should return "Hello World!"', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.text).to.be.equal('Hello World!');
          done();
        });
    });
  });
});
