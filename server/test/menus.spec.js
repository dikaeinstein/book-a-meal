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
  },
  {
    id: 2,
    name: 'Vegetable Soup',
    description: 'Made with vegetable and palm oil',
    imageUrl: 'http://img.com/vegetable.jpg',
  },
];

const emptyMenu = {
  name: `Menu for ${(new Date()).toDateString()}`,
  meals: [],
};

const menu = {
  name: `Menu for ${(new Date()).toDateString()}`,
  meals,
};

const menuUrl = '/api/v1/menus';
const signUpUrl = '/api/v1/auth/signup';

const user = {
  name: 'Solomon Okwa',
  email: 'solozyokwamenu@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
};
let token;

describe('Menu', () => {
  before(async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send(user);
    token = res.body.token;
  });

  // Test Setup Menu for specific day
  describe('Setup Menu', () => {
    it('should setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(menu);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.menu).to.be.an('object');
      expect(res.body.menu.name).to.equal(menu.name);
    });
    it('should not allow non auth admin to setup menu', async () => {
      const res = await chai.request(app).post(menuUrl)
        .send(menu);
      expect(res.status).to.equal(401);
      expect(res.body.error.token).to.equal('No token provided');
    });
    it('should not setup menu without meals', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(emptyMenu);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.meals).to
        .include('No meal have been added to menu');
    });
    it('should not setup menu without a name', async () => {
      const res = await chai.request(app).post(menuUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ meals });
      expect(res.status).to.equal(400);
      expect(res.body.error.name).to
        .include('Menu name is required');
    });
  });
});

// Test Get menu
