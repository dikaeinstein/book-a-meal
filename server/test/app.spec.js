import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const rooUrl = '/';
const rootAPIUrl = '/api/v1';

describe('Root path', () => {
  it('should return status: 200', async () => {
    const res = await chai.request(app).get(rooUrl);
    expect(res).to.have.status(200);
  });
});

describe('Invalid API route', () => {
  it('should be return a 404 error', async () => {
    const res = await chai.request(app).get(`${rootAPIUrl}/notfound`);
    expect(res.status).to.equal(404);
    expect(res.body.error.message).to
      .include("I'm pretty sure this is not what you are looking for, please enter a valid route");
  });
});
