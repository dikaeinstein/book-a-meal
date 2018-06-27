import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const rootAPIUrl = '/api/v1';

describe('Api docs', () => {
  it('should return http-status: 200', async () => {
    const res = await chai.request(app).get(`${rootAPIUrl}/api-docs`);
    expect(res).to.have.status(200);
    expect(res).to.have
      .header('content-type', 'text/html; charset=utf-8');
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
