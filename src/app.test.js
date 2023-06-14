const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /tokenize', () => {
  it('should tokenize account numbers', async () => {
    const accountNumbers = [
      '4111-1111-1111-1111',
      '4444-3333-2222-1111',
      '4444-1111-2222-3333',
    ];
    const res = await chai.request(app).post('/tokenize').send(accountNumbers);

    expect(res).to.have.status(200);
    expect(res.body).to.have.lengthOf(accountNumbers.length);
  });
});

describe('POST /detokenize', () => {
  it('should detokenize tokens', async () => {
    const accountNumbers = [
      '5555-1111-1111-1111',
      '6666-3333-2222-1111',
      '7777-1111-2222-3333',
    ];

    // First, tokenize the account numbers
    const tokenizeRes = await chai
      .request(app)
      .post('/tokenize')
      .send(accountNumbers);

    expect(tokenizeRes).to.have.status(200);

    // Then, detokenize the tokens
    const detokenizeRes = await chai
      .request(app)
      .post('/detokenize')
      .send(tokenizeRes.body);

    expect(detokenizeRes).to.have.status(200);
    expect(detokenizeRes.body).to.deep.equal(accountNumbers);
  });
});
