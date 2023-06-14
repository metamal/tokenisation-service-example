const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /tokenize', () => {
  it('should return correct tokens', async () => {
    const accountNumbers = [
      '4111-1111-1111-1111',
      '4444-3333-2222-1111',
      '4444-1111-2222-3333',
    ];
    const expectedBody = [
      'b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac',
      '0f7dc9af51859b2b3f85150755d4296e36d5b7881bbba9120260e20cefc88b52',
      '9125724ec8da8f2b1c4d4cb487c23af2e60df6529cc4851bdf8bbd85bc65f709',
    ];

    const res = await chai.request(app).post('/tokenize').send(accountNumbers);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(expectedBody);
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

  it('should return nulls for invalid tokens', async () => {
    const invalidTokens = [
      '5555-1111-1111-1111',
      '6666-3333-2222-1111',
      '7777-1111-2222-3333',
    ];
    const expectedResult = [null, null, null];

    const detokenizeRes = await chai
      .request(app)
      .post('/detokenize')
      .send(invalidTokens);

    expect(detokenizeRes).to.have.status(200);
    expect(detokenizeRes.body).to.deep.equal(expectedResult);
  });
});
