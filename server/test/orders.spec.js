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

const order = {
  mealId: 1,
  amount: 2000,
  quantity: 1,
  total: 2000,
  userId: 1,
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

  // Test Post an order
  describe('Post an order', () => {
    it('should allow auth customers place an order', async () => {
      const res = await chai.request(app).post(orderUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(order);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.order).to.be.an('object');
    });
    it('should not allow non auth customers to post an order', async () => {
      const res = await chai.request(app).post(orderUrl)
        .send(order);
      expect(res.status).to.equal(401);
      expect(res.body).to.be.an('object');
      expect(res.body.error.token).to
        .include('No token provided');
    });
  });

  // Test Update an order
  describe('Update an order', () => {
    it('should allow auth customers update their order', async () => {
      const res = await chai.request(app).put(`${orderUrl}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          total: 4000,
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.order).to.be.an('object');
    });
    it('should not allow non auth customers update their order', async () => {
      const res = await chai.request(app).put(`${orderUrl}/1`)
        .send({
          quantity: 2,
          total: 4000,
        });
      expect(res.status).to.equal(401);
      expect(res.body).to.be.an('object');
      expect(res.body.error.token).to.include('No token provided');
    });
  });
});
