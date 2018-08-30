import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Meal } from '../models';
import mockUsers from './usersTestData';

dotenv.config();

chai.use(chaiHttp);

const { expect } = chai;

const menuUrl = '/api/v1/menu/';
const signUpUrl = '/api/v1/auth/signup';
const signInUrl = '/api/v1/auth/signin';

const admin = mockUsers[8];
const user = mockUsers[3];

let token;
let adminToken;
let superAdminToken;
let meals;
let mealIds;
let menu;

describe('Menu', () => {
  // Setup user(superAdmin)
  before(async () => {
    const res = await chai.request(app).post(signInUrl)
      .send({
        email: process.env.email,
        password: process.env.password,
      });
    superAdminToken = res.body.token;
  });
  // Setup caterer(admin)
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
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send({
          mealIds: [2],
        });
      expect(res.status).to.equal(404);
      expect(res.body.error.message).to
        .equal('Menu not found or have not been setup');
    });
    it('should not setup menu with meal ids that don"t exist', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send({
          name: 'menu for today',
          mealIds: [1, 2, 100],
        });
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.mealIds).to
        .equal(`One or more meal cannot be found, 
please include meal that exist when setting up menu`);
    });
    it('should only allow super admin setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send(menu);
      expect(res.status).to.equal(201);
      expect(res.body.menu.name).to.equal(menu.name);
      expect(res.body.menu.meals.length).to.lessThan(30);
      expect(res.body.links.length).to.equal(1);
      expect(res.body.links[0].href).to.include('limit=30&page=1');
    });
    it('should not allow non auth admin to setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(menu);
      expect(res.status).to.equal(403);
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the privilege to perform this operation");
    });
    it('should not allow caterer to setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(menu);
      expect(res.status).to.equal(403);
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the privilege to perform this operation");
    });
    it('should not setup menu without meals', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${superAdminToken}`)
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
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send({ meals });
      expect(res.status).to.equal(400);
      expect(res.body.error.name).to
        .include('Menu name is required');
    });
    it('should not setup menu with invalid meal ids', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send({
          name: 'menu for today',
          mealIds: [1, 2, 'a'],
        });
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.mealIds).to
        .include('mealIds can only be integer values');
    });
    it('should not setup menu more than once', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send(menu);
      expect(res.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error.message).to
        .include('Menu for the day have been set');
    });
    it('should not setup menu with mealIds that is not an array', async () => {
      const res = await chai.request(app).post(`${menuUrl}`)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send({
          name: 'empty menu',
          mealIds: 1,
        });
      expect(res.status).to.equal(400);
      expect(res.body.error.mealIds).to
        .include('mealIds must be an array');
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
      expect(res.body.menu.meals).to.be.an('array');
      expect(res.body.menu.meals.length).to.equal(3);
    });
    it('should return 4 meals if limit is set to 4', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=4`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.menu.meals.length).to.be.equal(4);
    });
    it('should return 2 meal from page three', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=2&page=3`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.menu.meals.length).to.be.equal(2);
    });
    it('should return links to traverse meals', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=2`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(linkNames.length).to.equal(3);
      expect(linkNames).to.include('next');
      expect(linkNames).to.include('last');
      expect(linkNames).to.include('self');
    });
    it('should return link to first page', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=2&page=2`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(res.body.menu.meals.length).to.equal(2);
      expect(linkNames).to.include('first');
      expect(linkNames.length).to.equal(5);
    });
    it('should return an error if limit is less than zero', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=-10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit cannot be less than zero');
    });
    it('should return an error if limit is a fractional number', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=9.5`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a whole number');
    });
    it('should return an error if limit is not a number', async () => {
      const res = await chai.request(app).get(`${menuUrl}?limit=b`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a number');
    });
    it('should return an error if page is less than zero', async () => {
      const res = await chai.request(app).get(`${menuUrl}?page=-10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page cannot be less than zero');
    });
    it('should return an error if page is a fractional number', async () => {
      const res = await chai.request(app).get(`${menuUrl}?page=9.5`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a whole number');
    });
    it('should return an error if page is not a number', async () => {
      const res = await chai.request(app).get(`${menuUrl}?page=b`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a number');
    });
  });
});

// Test Update Menu
describe('Update Menu', () => {
  it('should update menu', async () => {
    const res = await chai.request(app).put(`${menuUrl}1`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({
        mealIds: [2],
      });
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.menu.meals.length).to.lessThan(30);
    expect(res.body.links.length).to.equal(1);
    expect(res.body.links[0].href).to.include('limit=30&page=1');
  });
  it('should not update menu without meals', async () => {
    const res = await chai.request(app).put(`${menuUrl}1`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({
        name: 'empty menu',
        mealIds: [],
      });
    expect(res.status).to.equal(400);
    expect(res.body.error.mealIds).to
      .include('Menu must have at least one meal');
  });
  it('should not update menu with mealIds that is not an array', async () => {
    const res = await chai.request(app).put(`${menuUrl}1`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({
        name: 'empty menu',
        mealIds: 1,
      });
    expect(res.status).to.equal(400);
    expect(res.body.error.mealIds).to
      .include('mealIds must be an array');
  });
  it('should not update menu with invalid mealIds', async () => {
    const res = await chai.request(app).put(`${menuUrl}`)
      .set('Authorization', `Bearer ${superAdminToken}`)
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
  it('should update menu without menuId', async () => {
    const res = await chai.request(app).put(`${menuUrl}`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({
        mealIds: [2, 3],
      });
    expect(res.status).to.equal(200);
    expect(res.body.menu.meals.length).to.lessThan(30);
    expect(res.body.links.length).to.equal(1);
    expect(res.body.links[0].href).to.include('limit=30&page=1');
  });
  it('should update menu without mealIds', async () => {
    const res = await chai.request(app).put(`${menuUrl}1`)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({
        name: 'Menu without mealIds',
      });
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.equal('Successfully updated menu');
    expect(res.body.menu.name).to.equal('Menu without mealIds');
    expect(res.body.menu.meals.length).to.lessThan(30);
    expect(res.body.links.length).to.equal(1);
    expect(res.body.links[0].href).to.include('limit=30&page=1');
  });
  it('should not update menu with meal ids that don"t exist', async () => {
    const res = await chai.request(app).put(menuUrl)
      .set('Authorization', `Bearer ${superAdminToken}`)
      .send({
        name: 'menu for today',
        mealIds: [1, 2, 100],
      });
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal('error');
    expect(res.body.error.mealIds).to
      .equal(`One or more meal cannot be found, 
please include meal that exist when setting up menu`);
  });
  it('should not allow caterer to update menu', async () => {
    const res = await chai.request(app).put(menuUrl)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(menu);
    expect(res.status).to.equal(403);
    expect(res.body.error.message).to
      .equal("Forbidden, you don't have the privilege to perform this operation");
  });
});

// Test Delete Menu
describe('Delete Menu', () => {
  it('should delete menu if it exists', async () => {
    const res = await chai.request(app).delete(`${menuUrl}1`)
      .set('Authorization', `Bearer ${superAdminToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.equal('Menu successfully deleted');
  });
  it('should not delete menu if does not exists', async () => {
    const res = await chai.request(app).delete(`${menuUrl}100`)
      .set('Authorization', `Bearer ${superAdminToken}`);
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
  it('should not allow caterer to delete menu', async () => {
    const res = await chai.request(app).del(`${menuUrl}1`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).to.equal(403);
    expect(res.body.status).to.equal('error');
    expect(res.body.error.message).to
      .equal("Forbidden, you don't have the privilege to perform this operation");
  });
});
