import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import { Order } from '../models';
import users from './usersTestData';
import orders from './ordersTestData';

const { expect } = chai;
chai.use(chaiHttp);

const orderUrl = '/api/v1/orders';
const signUpUrl = '/api/v1/auth/signup';

const admin = users[4];
const user = users[5];

let token;
let adminToken;
let userId;

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
    userId = res.body.user.id;
  });

  // Test Get all orders
  describe('Get all Orders', () => {
    it('should return an error when array of orders is empty', async () => {
      const res = await chai.request(app).get(orderUrl)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to
        .include('No order have been placed');
    });
    it('should return an array', async () => {
      await Order.bulkCreate(orders);
      const res = await chai.request(app).get(orderUrl)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.orders).to.be.an('array');
      expect(res.body.orders.length).to.equal(21);
    });
    it('should return 10 orders if limit is set to 10', async () => {
      const res = await chai.request(app).get(`${orderUrl}?limit=10`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.orders.length).to.be.equal(10);
    });
    it('should return 1 order from page three', async () => {
      const res = await chai.request(app).get(`${orderUrl}?limit=10&page=3`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.orders.length).to.be.equal(1);
    });
    it('should return links to traverse orders', async () => {
      const res = await chai.request(app).get(`${orderUrl}?limit=10`)
        .set('Authorization', `Bearer ${adminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(linkNames.length).to.equal(3);
      expect(linkNames).to.include('next');
      expect(linkNames).to.include('last');
      expect(linkNames).to.include('self');
    });
    it('should return link to first page', async () => {
      const res = await chai.request(app).get(`${orderUrl}?limit=10&page=2`)
        .set('Authorization', `Bearer ${adminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(res.body.orders.length).to.equal(10);
      expect(linkNames).to.include('first');
      expect(linkNames.length).to.equal(5);
    });
    it('should return an error if limit is less than zero', async () => {
      const res = await chai.request(app).get(`${orderUrl}?limit=-10`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit cannot be less than zero');
    });
    it('should return an error if limit is a fractional number', async () => {
      const res = await chai.request(app).get(`${orderUrl}?limit=9.5`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a whole number');
    });
    it('should return an error if limit is not a number', async () => {
      const res = await chai.request(app).get(`${orderUrl}?limit=b`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a number');
    });
    it('should return an error if page is less than zero', async () => {
      const res = await chai.request(app).get(`${orderUrl}?page=-10`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page cannot be less than zero');
    });
    it('should return an error if page is a fractional number', async () => {
      const res = await chai.request(app).get(`${orderUrl}?page=9.5`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a whole number');
    });
    it('should return an error if page is not a number', async () => {
      const res = await chai.request(app).get(`${orderUrl}?page=b`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a number');
    });
  });

  // Test Post an order
  describe('Post an order', () => {
    it('should allow auth customers place an order', async () => {
      const res = await chai.request(app).post(orderUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(orders[0]);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.order).to.be.an('object');
      expect(res.body.order.total).to.equal(orders[0].total);
      expect(res.body.order.quantity).to.equal(parseInt(orders[0].quantity, 10));
      expect(res.body.order.status).to.equal('pending');
    });
    it('should not allow non auth customers to post an order', async () => {
      const res = await chai.request(app).post(orderUrl)
        .send(orders[0]);
      expect(res.status).to.equal(401);
      expect(res.body).to.be.an('object');
      expect(res.body.error.token).to
        .include('No token provided');
    });
    it('should post an order without userId in request params', async () => {
      const res = await chai.request(app).post(orderUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(orders[3]);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.message).to.equal('Order placed');
    });
    it('should not post an order with an invalid quantity', async () => {
      const res = await chai.request(app).post(orderUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({
          mealId: '2',
          amount: '2000',
          quantity: '-3',
          total: '2000',
        });
      expect(res.status).to.equal(400);
      expect(res.body.error.quantity).to
        .include('Order quantity cannot be less than zero');
    });
    it('should return an error if meal does not exist', async () => {
      const res = await chai.request(app).post(orderUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({
          mealId: 100,
          amount: 2000,
          quantity: 3,
          total: 6000,
        });
      expect(res.status).to.equal(404);
      expect(res.body.message).to.include('Meal does not exist');
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
    it('should not update an order with incorrect id', async () => {
      const res = await chai.request(app).put(`${orderUrl}/45.564`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          quantity: '2',
          total: '4000',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.orderId).to
        .include('Order id must be a whole number');
    });
    it('should not modify an order with id that is not a number', async () => {
      const res = await chai.request(app).put(`${orderUrl}/a`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          quantity: '2',
          total: '4000',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.orderId).to
        .include('Order id must be a number');
    });
    it('should not modify an order with order id that is less than zero', async () => {
      const res = await chai.request(app).put(`${orderUrl}/-50`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          quantity: '2',
          total: '4000',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.orderId).to
        .include('Order id cannot be less than zero');
    });
    it('should not update an order without order id that is a whole number', async () => {
      const res = await chai.request(app).put(`${orderUrl}/45.555`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error.orderId).to
        .include('Order id must be a whole number');
    });
    describe('Modify an expired order', () => {
      let clock;
      before(() => {
        clock = sinon.useFakeTimers(Date.now());
        // Tick the clock ahead by 30mins
        clock.tick(1800000);
      });
      after(() => {
        clock.restore();
      });
      it('should not allow customer modify an order after 30 mins', async () => {
        const res = await chai.request(app).put(`${orderUrl}/1`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            quantity: '1',
            total: '2000',
          });
        expect(res.status).to.equal(405);
        expect(res.body.error.message).to
          .include('You can no longer update this order');
      });
      it('should not allow customer modify an order if it has expired', async () => {
        const res = await chai.request(app).put(`${orderUrl}/1`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            quantity: '1',
            total: '2000',
          });
        expect(res.status).to.equal(405);
        expect(res.body.error.message).to
          .include('You can no longer update this order');
      });
      it('should allow admin(caterer) modify expired order', async () => {
        const res = await chai.request(app).put(`${orderUrl}/1`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            quantity: 1,
            total: 2000,
          });
        expect(res.status).to.equal(200);
        expect(res.body.message).to.include('Successfully updated order');
        expect(res.body.order.quantity).to.equal(1);
        expect(res.body.order.total).to.equal(2000);
      });
      it("should return an error if there's no order", async () => {
        const res = await chai.request(app).put(`${orderUrl}/100`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            quantity: 1,
            total: 2000,
          });
        expect(res.status).to.equal(404);
        expect(res.body.message).to.include('Order does not exist');
      });
    });
  });

  // Test Get order total amount for specific day
  describe('Get total amount made', () => {
    it('should return total for current day', async () => {
      const res = await chai.request(app).get(`${orderUrl}/totalAmount`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.totalAmount).to.equal(46000);
    });
    it('should not retrieve total for non admin user', async () => {
      const res = await chai.request(app).get(`${orderUrl}/totalAmount`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the privilege to perform this operation");
    });
  });

  // Test Get total number of orders made
  describe('Get total number of orders', () => {
    it('should return  total number of orders made', async () => {
      const res = await chai.request(app).get(`${orderUrl}/totalOrders`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.totalOrders).to.be.gt(0);
      expect(res.body.totalOrders).to.equal(23);
      expect(res.body.message).to
        .include('Total number of orders made successfully retrieved');
    });
    it('should not retrieve total number of orders for non admin user', async () => {
      const res = await chai.request(app).get(`${orderUrl}/totalOrders`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the privilege to perform this operation");
    });
  });

  // Test Get order history for specific user
  describe('Get orders for specific user', () => {
    // Admin can get order history for specific user
    it('should get orders for specific auth user with userId', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.orders).to.be.an('array');
      expect(res.body.orders.length).to.equal(21);
    });
    it('should return 10 orders if limit is set to 10', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?limit=10`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.orders.length).to.be.equal(10);
    });
    it('should return 1 order from page three', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?limit=10&page=3`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.orders.length).to.be.equal(1);
    });
    it('should return links to traverse orders', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?limit=10`)
        .set('Authorization', `Bearer ${adminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(linkNames.length).to.equal(3);
      expect(linkNames).to.include('next');
      expect(linkNames).to.include('last');
      expect(linkNames).to.include('self');
    });
    it('should return link to first page', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?limit=10&page=2`)
        .set('Authorization', `Bearer ${adminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(res.body.orders.length).to.equal(10);
      expect(linkNames).to.include('first');
      expect(linkNames.length).to.equal(5);
    });
    it('should return an error if limit is less than zero', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?limit=-10`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit cannot be less than zero');
    });
    it('should return an error if limit is a fractional number', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?limit=9.5`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a whole number');
    });
    it('should return an error if limit is not a number', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?limit=b`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a number');
    });
    it('should return an error if page is less than zero', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?page=-10`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page cannot be less than zero');
    });
    it('should return an error if page is a fractional number', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?page=9.5`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a whole number');
    });
    it('should return an error if page is not a number', async () => {
      const res = await chai.request(app).get(`${orderUrl}/users/2?page=b`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a number');
    });
  });

  // Test Delete order
  describe('Delete an order', () => {
    it('should allow admin delete an order', async () => {
      const res = await chai.request(app).delete(`${orderUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.message).to
        .include('Order successfully deleted');
    });
    it('should not delete an order if does not exist', async () => {
      const res = await chai.request(app).delete(`${orderUrl}/500`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.be.an('object');
      expect(res.body.error.id).to
        .include('Order does not exist');
    });
  });
});
