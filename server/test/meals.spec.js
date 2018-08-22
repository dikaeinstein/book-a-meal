import chai from 'chai';
import chaiHttp from 'chai-http';
import { Meal, User } from '../models';
import app from '../app';
import { hashPassword } from '../lib/encrypt';
import users from './usersTestData';
import meals from './mealsTestData';

const { expect } = chai;
chai.use(chaiHttp);

const mealUrl = '/api/v1/meals';
const signUpUrl = '/api/v1/auth/signup';
const signInUrl = '/api/v1/auth/signin';

const defaultImageUrl = 'https://res.cloudinary.com/dikaeinstein/image/upload/c_scale,q_auto:low,w_1029/v1525566673/book-a-meal/avocado-cooked-delicious-262959.jpg';

const admin = users[0];
const user = users[1];
const admin2 = users[2];

let token;
let adminToken;
let adminToken2;
let superAdminToken;

describe('Meals', () => {
  // Setup user(superAdmin)
  before(async () => {
    const hashedPassword = await hashPassword(process.env.password);

    await User.create({
      name: process.env.name,
      email: process.env.email,
      password: hashedPassword,
      role: 'superAdmin',
      created_at: new Date(),
      updated_at: new Date(),
    });
    const res = await chai.request(app).post(signInUrl)
      .send({
        email: process.env.email,
        password: process.env.password,
      });
    superAdminToken = res.body.token;
  });
  // Setup user(admin)
  before(async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send(admin);
    adminToken = res.body.token;
  });
  // Setup user2(admin)
  before(async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send(admin2);
    adminToken2 = res.body.token;
  });
  // Setup user(customer)
  before(async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send(user);
    token = res.body.token;
  });

  // Test Get All Meals
  describe('Get All Meals', () => {
    it('should return a custom message when array of meals is empty', async () => {
      const res = await chai.request(app).get(mealUrl)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body.message).to.include('There is currently no meal!');
    });
    it('should return an empty array', async () => {
      const res = await chai.request(app).get(mealUrl)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.meals).to.be.an('array');
      expect(res.body.meals).to.eql([]);
    });
    it('should return an array of meals', async () => {
      await Meal.bulkCreate(meals);
      const res = await chai.request(app).get(mealUrl)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.meals.length).to.be.lessThan(30);
    });
    it('should return 10 meals if limit is set', async () => {
      const res = await chai.request(app).get(`${mealUrl}?limit=10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.meals.length).to.be.equal(10);
    });
    it('should return 2 meals from page two', async () => {
      const res = await chai.request(app).get(`${mealUrl}?limit=10&page=2`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.meals.length).to.be.equal(2);
    });
    it('should return links to traverse meals', async () => {
      const res = await chai.request(app).get(`${mealUrl}?limit=10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(linkNames.length).to.equal(3);
      expect(linkNames).to.include('next');
      expect(linkNames).to.include('last');
      expect(linkNames).to.include('self');
    });
    it('should return link to first page', async () => {
      const res = await chai.request(app).get(`${mealUrl}?limit=10&page=2`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(linkNames).to.include('first');
    });
    it('should return an error if limit is less than zero', async () => {
      const res = await chai.request(app).get(`${mealUrl}?limit=-10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit cannot be less than zero');
    });
    it('should return an error if limit is a fractional number', async () => {
      const res = await chai.request(app).get(`${mealUrl}?limit=9.5`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a whole number');
    });
    it('should return an error if limit is not a number', async () => {
      const res = await chai.request(app).get(`${mealUrl}?limit=b`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a number');
    });
    it('should return an error if page is less than zero', async () => {
      const res = await chai.request(app).get(`${mealUrl}?page=-10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page cannot be less than zero');
    });
    it('should return an error if page is a fractional number', async () => {
      const res = await chai.request(app).get(`${mealUrl}?page=9.5`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a whole number');
    });
    it('should return an error if page is not a number', async () => {
      const res = await chai.request(app).get(`${mealUrl}?page=b`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a number');
    });
  });

  // Test Get a meal
  describe('Get Meal', () => {
    it('should return one meal', async () => {
      const res = await chai.request(app).get(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
    it('should not get meal for wrong id', async () => {
      const res = await chai.request(app).get(`${mealUrl}/100`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body.error.id).to
        .include('Meal does not exist');
    });
    it('should not get meal for meal id that is not an integer', async () => {
      const res = await chai.request(app).get(`${mealUrl}/6.66`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.error.mealId).to
        .include('Meal id must be a whole number');
    });
    it('should not get meal for meal id that is greater than max integer value', async () => {
      const res = await chai.request(app).get(`${mealUrl}/999007199254740991`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.error.mealId).to
        .include('Meal id is not a valid integer');
    });
    it('should not get meal with meal id that is less than zero', async () => {
      const res = await chai.request(app).get(`${mealUrl}/-5`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.mealId).to
        .include('Meal id cannot be less than zero');
    });
  });

  // Test Adding a meal
  describe('Add Meal', () => {
    it('should add meal with complete fields', async () => {
      const meal = {
        name: 'Semo and Abang soup',
        description: 'Some dummy description',
        imageUrl: 'https://mydummyimgurl.com',
        price: '2500',
      };

      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(meal);
      expect(res).to.have.status(201);
      expect(res.body.meal).to.be.an('object');
      expect(res.body.meal.name).to.equal(meal.name);
      expect(res.body.meal.description).to.equal(meal.description);
      expect(res.body.meal.imageUrl).to.equal(meal.imageUrl);
      expect(res.body.meal.price).to.equal(meal.price);
      expect(res.body.message).to
        .include('Successfully added meal');
    });
    it('should not allow non auth admin to add meal', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', 'Bearer crazyTokenForTest')
        .send(meals[0]);
      expect(res).to.have.status(401);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to
        .include('Unauthorized');
    });
    it('should not add meal without name', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'I am the description for the meal without name',
          imageUrl: 'https://mydummyimgurl.com',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.name).to.include('Meal name is required');
    });
    it('should not add meal with empty name', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '',
          description: 'I am the description for the meal without name',
          imageUrl: 'https://mydummyimgurl.com',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.name).to.include('Meal name is required');
    });
    it('should not add meal without description', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal without description',
          imageUrl: 'https://mydummyimgurl.com',
          price: '2000',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.description)
        .to.include('Meal description is required');
    });
    it('should not add meal with empty description', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty description',
          description: '',
          imageUrl: 'https://mydummyimgurl.com',
          price: '2000',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.description)
        .to.include('Meal description is required');
    });
    it('should not add meal with description less than 3 characters', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty description',
          description: 'ab',
          imageUrl: 'https://mydummyimgurl.com',
          price: '2000',
        });
      expect(res).to.have.status(400);
      expect(res.body.error).to.be.an('object');
      expect(res.body.error.description).to
        .include('Meal description cannot be less than 3 characters');
    });
    it('should add meal without image url', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal without image url',
          description: 'I am the description for the meal without image url',
          price: '2000',
        });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.meal).to.be.an('object');
      expect(res.body.meal.imageUrl).to
        .equal(defaultImageUrl);
      expect(res.body.message)
        .to.include('Successfully added meal');
    });
    it('should not add meal with empty image url', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty image url',
          description: 'I am the description for the meal without image url',
          imageUrl: '',
          price: '3000',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.imageUrl)
        .to.include('Meal image url must be a valid url');
    });
    it('should not add meal with invalid image url', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with invalid image url',
          description: 'I am the description for the meal without image url',
          imageUrl: 'htt-s',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.imageUrl)
        .to.include('Meal image url must be a valid url');
    });
    it('should not add meal without price', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty image url',
          description: 'I am the description for the meal without image url',
          imageUrl: 'http://somedummyurl.com/fake.jpg',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.price).to
        .include('Meal price is required');
    });
    it('should not add meal with a name that already exists', async () => {
      const meal = {
        name: 'Semo and Abang soup',
        description: 'Some dummy description',
        imageUrl: 'https://mydummyimgurl.com',
        price: '2500',
      };

      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(meal);
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.message).to
        .include('Meal name already exist');
    });
  });

  // Test Get meals for specific caterer
  describe('Get meals for specific user(caterer)', () => {
    it('should get meals for specific auth signed in user(caterer)', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.meals).to.be.an('array');
      expect(res.body.meals.length).to.equal(6);
    });
    it('should get meals for specific auth user with userId', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.meals).to.be.an('array');
      expect(res.body.meals.length).to.equal(6);
    });
    it('should return error when no meals is found', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
      expect(res.body.message).to.equal('No meals found!');
    });
    it('should return 4 meals if limit is set to 4', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?limit=4`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.meals.length).to.be.equal(4);
    });
    it('should return 2 meal from page three', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?limit=2&page=3`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.meals.length).to.be.equal(2);
    });
    it('should return links to traverse meals', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?limit=2`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(linkNames.length).to.equal(3);
      expect(linkNames).to.include('next');
      expect(linkNames).to.include('last');
      expect(linkNames).to.include('self');
    });
    it('should return link to first page', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?limit=2&page=2`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      const linkNames = res.body.links.map(link => link.rel);
      expect(res.status).to.equal(200);
      expect(res.body.meals.length).to.equal(2);
      expect(linkNames).to.include('first');
      expect(linkNames.length).to.equal(5);
    });
    it('should return an error if limit is less than zero', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?limit=-10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit cannot be less than zero');
    });
    it('should return an error if limit is a fractional number', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?limit=9.5`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a whole number');
    });
    it('should return an error if limit is not a number', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?limit=b`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.limit).to.equal('limit must be a number');
    });
    it('should return an error if page is less than zero', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?page=-10`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page cannot be less than zero');
    });
    it('should return an error if page is a fractional number', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?page=9.5`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a whole number');
    });
    it('should return an error if page is not a number', async () => {
      const res = await chai.request(app).get(`${mealUrl}/caterers/2?page=b`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error.page).to.equal('page must be a number');
    });
  });

  // Test Updating a meal
  describe('Update Meal', () => {
    it('should update meal with correct id', async () => {
      const res = await chai.request(app).put(`${mealUrl}/2`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'super sumptuous',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.meal.description).to
        .include('super sumptuous');
    });
    it('should not update meal with incorrect id', async () => {
      const res = await chai.request(app).put(`${mealUrl}/100`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'meal with wrong id',
        });
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error.mealId).to
        .include('Meal you want to update does not exist');
    });
    it('should not update meal with id that is not a number', async () => {
      const res = await chai.request(app).put(`${mealUrl}/a`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'meal with wrong id',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.mealId).to
        .include('Meal id must be a number');
    });
    it('should not allow non auth admin to update meal', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'super sumptuous',
        });
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the privilege to perform this operation");
    });
    it('should not update meal if meal name already exists', async () => {
      const res = await chai.request(app).put(`${mealUrl}/13`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: meals[0].name,
        });
      expect(res.status).to.equal(409);
      expect(res.body.error.name).to
        .equal('You cannot update meal name to an existing meal name');
    });
    it('should update meal to its current meal name', async () => {
      const res = await chai.request(app).put(`${mealUrl}/13`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Semo and Abang soup',
        });
      expect(res.status).to.equal(200);
      expect(res.body.meal.name).to.equal('Semo and Abang soup');
    });
    it('should not update meal with price that is less than zero', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: '-500',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error.price).to
        .include('Meal price cannot be less than zero');
    });
    it('should not update meal with empty image url', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty image url',
          description: 'I am the description for the meal without image url',
          imageUrl: '',
          price: '3000',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.imageUrl)
        .to.include('Meal image url must be a valid url');
    });
    it('should not update meal with invalid image url', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with invalid image url',
          description: 'I am the description for the meal without image url',
          imageUrl: 'htt-s',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.imageUrl)
        .to.include('Meal image url must be a valid url');
    });
    it('should not update meal with empty description', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty description',
          description: '    ',
          imageUrl: 'https://mydummyimgurl.com',
          price: '2000',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.description)
        .to.include('Meal description is required');
    });
    it('should not update meal with description less than 3 characters', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty description',
          description: 'ab',
          imageUrl: 'https://mydummyimgurl.com',
          price: '2000',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.description).to
        .include('Meal description cannot be less than 3 characters');
    });
    it('should not update meal if it is not yours', async () => {
      const res = await chai.request(app).put(`${mealUrl}/13`)
        .set('Authorization', `Bearer ${adminToken2}`)
        .send({
          name: meals[0].name,
        });
      expect(res.status).to.equal(404);
      expect(res.body.error.mealId).to
        .equal('Meal you want to update does not exist');
    });
  });

  // Test Delete a meal
  describe('Delete Meal', () => {
    it('should delete meal if it exist', async () => {
      const res = await chai.request(app).del(`${mealUrl}/1/users`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
    });
    it('should allow superAdmin delete meal if it exist', async () => {
      const res = await chai.request(app).del(`${mealUrl}/4`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(200);
    });
    it('should not delete meal if it does not exist', async () => {
      const res = await chai.request(app).del(`${mealUrl}/100`)
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body.error.mealId).to
        .include('Meal does not exist');
    });
    it('should not delete meal if it is not yours', async () => {
      const res = await chai.request(app).del(`${mealUrl}/1/users`)
        .set('Authorization', `Bearer ${adminToken2}`);
      expect(res.status).to.equal(404);
      expect(res.body.error.mealId).to
        .include('Meal does not exist');
    });
    it('should not allow non auth admin to delete meal', async () => {
      const res = await chai.request(app).del(`${mealUrl}/2`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to
        .equal("Forbidden, you don't have the privilege to perform this operation");
    });
  });
});
