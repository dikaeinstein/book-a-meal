import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import users from './usersTestData';

chai.use(chaiHttp);

const { expect } = chai;

const menuUrl = '/api/v1/menu/';
const signUpUrl = '/api/v1/auth/signup';

const admin = users[2];
const user = users[3];

let token;
let adminToken;
let meals;
let mealIds;
let menu;

describe('Menu', () => {
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
  // Get meals
  before(async () => {
    const res = await chai.request(app).get('/api/v1/meals')
      .set('Authorization', `Bearer ${adminToken}`);
    meals = res.body.meals;
    mealIds = meals.map(meal => meal.id);
    menu = {
      name: 'Menu for today',
      mealIds,
    };
  });
  // Test Setup Menu for specific day
  describe('Setup Menu', () => {
    it('should not get menu if menu is not set', async () => {
      const res = await chai.request(app).get(menuUrl)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to
        .equal('Menu for today have not been set');
    });
    it('should only allow admin setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(menu);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.menu).to.be.an('object');
      expect(res.body.menu.name).to.equal(menu.name);
      expect(res.body.menu.meals[0].name).to.eql(meals[0].name);
    });
    it('should not allow non auth admin to setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(menu);
      expect(res.status).to.equal(403);
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the priviledge to perform this operation");
    });
    it('should not setup menu without meals', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'empty menu',
          mealIds: [],
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.mealIds).to
        .include('Menu must have at least one meal');
    });
    it('should not setup menu without a name', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ meals });
      expect(res.status).to.equal(400);
      expect(res.body.error.name).to
        .include('Menu name is required');
    });
  });

  // Test Get Menu for specific day
  describe('Get Menu', () => {
    it('should get menu for specific day', async () => {
      const res = await chai.request(app).get(menuUrl)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.menu).to.be.an('object');
      expect(res.body.menu.meals).to.be.an('array');
    });
  });
});

// Test Update Menu
describe('Update Menu', () => {
  it('should update menu', async () => {
    const res = await chai.request(app).put(`${menuUrl}1`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        mealIds: [2],
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equal('success');
    expect(res.body.menu).to.be.an('object');
    expect(res.body.menu.meals).to.be.an('array');
    expect(res.body.menu.meals[0].name).to
      .include(meals[0].name);
  });
});
