import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const orderUrl = '/api/v1/orders';
const signUpUrl = '/api/v1/auth/signup';

const admin = {
  name: 'Walter Okwa',
  email: 'walterorder@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
  role: 'caterer',
};

const user = {
  name: 'Ann Ihe',
  email: 'anniheorder@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
  role: 'customer',
};

const order = {
  mealId: '2',
  amount: '2000',
  quantity: '1',
  total: '2000',
  userId: '1',
};

let token;
let adminToken;

describe('Orders', () => {
  // Setup user(admin)
  before(async () => {
    const res = await chai.request(app).post(signUpUrl)
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
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.orders).to.be.an('array');
    });
    it('should return a custom message when array of orders is empty', async () => {
      const res = await chai.request(app).get(orderUrl)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to
        .include('No order have been placed');
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
      expect(res.body.order.amount).to.equal(order.amount);
      expect(res.body.order.total).to.equal(order.total);
      expect(res.body.order.quantity).to.equal(parseInt(order.quantity, 10));
      expect(res.body.order.user_id).to.equal(parseInt(order.userId, 10));
      expect(res.body.order.meal_id).to.equal(parseInt(order.mealId, 10));
      expect(res.body.order.status).to.equal('pending');
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
          quantity: '2',
          total: '4000',
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.order).to.be.an('object');
      expect(res.body.order.quantity).to.equal('2');
      expect(res.body.order.total).to.equal('4000');
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

  // Test Get order total amount for specific day
  describe('Get total amount made', () => {
    it('should return total for current day', async () => {
      const res = await chai.request(app).get(`${orderUrl}/total`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.total).to.equal('4000');
    });
    it('should not retrieve total for non admin user', async () => {
      const res = await chai.request(app).get(`${orderUrl}/total`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to.equal('Forbidden');
    });
  });

  // Test Get order history for specific user
  describe('Get orders for specific user', () => {
    // authenticated customer can see order history
    it('should get orders for specific auth user without userId', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.orders).to.be.an('array');
    });
    // Admin can get order history for specific user
    it('should get orders for specific auth user with userId', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.orders).to.be.an('array');
    });
  });
});
