import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Meal } from '../models';
import mockUsers from './usersTestData';

chai.use(chaiHttp);

const { expect } = chai;

const menuUrl = '/api/v1/menu/';
const signUpUrl = '/api/v1/auth/signup';

const admin = mockUsers[2];
const user = mockUsers[3];

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
    meals = await Meal.findAll({});
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
    it('should not update menu if menu is not set', async () => {
      const res = await chai.request(app).put(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          mealIds: [2],
        });
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.an('object');
      expect(res.body.error.message).to
        .equal('Menu not found or have not been setup');
    });
    it('should only allow admin setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(menu);
      expect(res.status).to.equal(201);
      expect(res.body.menu.name).to.equal(menu.name);
      expect(res.body.menu.meals[0].name).to.eql(meals[0].name);
      expect(res.body.menu.meals.length).to.lessThan(30);
      expect(res.body.links.length).to.equal(2);
      expect(res.body.links[0].href).to.include('limit=30&start');
      expect(res.body.links[1].href).to.include('?limit=30&start=1');
    });
    it('should not allow non auth admin to setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(menu);
      expect(res.status).to.equal(403);
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the privilege to perform this operation");
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
    it('should not setup menu with invalid meal ids', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'menu for today',
          mealIds: [1, 2, 'a'],
        });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error.mealIds).to
        .include('mealIds can only be integer values');
    });
    it('should not setup menu more than once', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(menu);
      expect(res.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error.message).to
        .include('Menu for the day have been set');
    });
  });

  // Test Get Menu for specific day
  describe('Get Menu', () => {
    it('should get menu for specific day', async () => {
      const res = await chai.request(app).get(menuUrl)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.menu).to.be.an('object');
      expect(res.body.menu.meals).to.be.an('array');
    });
    it('should paginate menu meals using specified limit', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=${3}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.menu).to.be.an('object');
      expect(res.body.menu.meals).to.be.an('array');
      expect(res.body.menu.meals.length).to.equal(3);
    });
    it('should paginate menu meals using specified start', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=3&start=6`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.menu).to.be.an('object');
      expect(res.body.menu.meals).to.be.an('array');
      expect(res.body.menu.meals.length).to.equal(3);
    });
    it('should paginate menu meals with default values', async () => {
      const res = await chai.request(app).get(`${menuUrl}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.menu).to.be.an('object');
      expect(res.body.menu.meals).to.be.an('array');
      expect(res.body.menu.meals.length).to.lessThan(30);
    });
    it('should return links to traverse menu meals', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=${3}`)
        .set('Authorization', `Bearer ${token}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.links.length).to.equal(3);
      expect(linkNames).include('next');
      expect(linkNames).include('self');
      expect(linkNames).include('previous');
    });
    it('should return correct links to traverse menu meals', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=${3}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.links.length).to.equal(3);
      expect(res.body.links[0].href).to.include('limit=3&start');
      expect(res.body.links[1].href).to.include('previous=true');
      expect(res.body.links[2].href).to.include('?limit=3&start=1');
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
    expect(res.body.status).to.equal('success');
    expect(res.body.menu.meals[0].name).to.include(meals[0].name);
    expect(res.body.menu.meals.length).to.lessThan(30);
    expect(res.body.links.length).to.equal(2);
    expect(res.body.links[0].href).to.include('limit=30&start');
    expect(res.body.links[1].href).to.include('?limit=30&start=1');
  });
  it('should not update menu without meals', async () => {
    const res = await chai.request(app).put(`${menuUrl}1`)
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
  it('should not update menu with invalid meal ids', async () => {
    const res = await chai.request(app).put(`${menuUrl}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'menu for today',
        mealIds: [1, 2, 'a'],
      });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('object');
    expect(res.body.status).to.equal('error');
    expect(res.body.error.mealIds).to
      .include('mealIds can only be integer values');
  });
  it('should update menu', async () => {
    const res = await chai.request(app).put(`${menuUrl}1`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        mealIds: [2],
      });
    expect(res.status).to.equal(200);
    expect(res.body.menu.meals.length).to.lessThan(30);
    expect(res.body.links.length).to.equal(2);
    expect(res.body.links[0].href).to.include('limit=30&start');
    expect(res.body.links[1].href).to.include('?limit=30&start=1');
  });
});

// Test Delete Menu
describe('Delete Menu', () => {
  it('should delete menu if it exists', async () => {
    const res = await chai.request(app).delete(`${menuUrl}1`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.equal('Menu successfully deleted');
  });
  it('should not delete menu if does not exists', async () => {
    const res = await chai.request(app).delete(`${menuUrl}100`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal('error');
    expect(res.body.message).to.equal('Menu does not exist');
  });
  it('should not allow non auth admin to delete menu', async () => {
    const res = await chai.request(app).del(`${menuUrl}1`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(403);
    expect(res.body.status).to.equal('error');
    expect(res.body.error.message).to
      .equal("Forbidden, you don't have the privilege to perform this operation");
  });
});
