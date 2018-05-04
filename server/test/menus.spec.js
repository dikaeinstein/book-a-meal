import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const meals = [
  {
    id: 1,
    name: 'Spaghetti with meat balls',
    description: 'Some dummy description',
    imageUrl: 'https://mydummyimgurl.com',
    price: '2000',
  },
  {
    id: 2,
    name: 'Vegetable Soup',
    description: 'Made with vegetable and palm oil',
    imageUrl: 'http://img.com/vegetable.jpg',
    price: '2000',
  },
];
const mealIds = meals.map(meal => meal.id);

const emptyMenu = {
  name: `Menu for ${(new Date()).toDateString()}`,
  meals: [],
};

const menu = {
  name: `Menu for ${(new Date()).toDateString()}`,
  mealIds,
};

const menuUrl = '/api/v1/menu';
const signUpUrl = '/api/v1/auth/signup';

const admin = {
  name: 'Walter Okwa',
  email: 'waltermenu@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
  role: 'caterer',
};

const user = {
  name: 'Ann Ihe',
  email: 'annihemenu@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
  role: 'customer',
};

let token;
let adminToken;

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
      expect(res.body.error.message).to.equal('Forbidden');
    });
    it('should not setup menu without meals', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(emptyMenu);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.meals).to
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
    });
  });
});
