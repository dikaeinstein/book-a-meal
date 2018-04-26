import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const orderUrl = '/api/v1/orders';
const signUpUrl = '/api/v1/auth/signup';
const catererSignUpUrl = '/api/v1/caterer/auth/signup';

const admin = {
  name: 'Walter Okwa',
  email: 'walterorder@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
};

const user = {
  name: 'Ann Ihe',
  email: 'anniheorder@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
};

let token;
let adminToken;

describe('Orders', () => {
  // Setup user(admin)
  before(async () => {
    const res = await chai.request(app).post(catererSignUpUrl)
      .send(admin);
    adminToken = res.body.token;
  });
  // Setup user(customer)
  before(async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send(user);
    token = res.body.token;
  });

  // Test Get all orders
  describe('Get all Orders', () => {
    it('should return an array', async () => {
      const res = await chai.request(app).get(orderUrl)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.orders).to.be.an('array');
    });
  });
});
