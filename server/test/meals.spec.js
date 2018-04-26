import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const mealUrl = '/api/v1/meals';
const signUpUrl = '/api/v1/auth/signup';
const catererSignUpUrl = '/api/v1/caterer/auth/signup';

const meal = {
  id: 1,
  name: 'Spaghetti with meat balls',
  description: 'Some dummy description',
  imageUrl: 'https://mydummyimgurl.com',
};

const admin = {
  name: 'Walter Okwa',
  email: 'walter@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
};

const user = {
  name: 'Ann Ihe',
  email: 'annihe@gmail.com',
  password: '1234567890',
  confirmPassword: '1234567890',
};

let token;
let adminToken;

describe('Meals', () => {
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

  // Test Get All Meals
  describe('Get All Meals', () => {
    it('should return status 200', async () => {
      const res = await chai.request(app).get(mealUrl);
      expect(res).to.have.status(200);
    });
    it('should return an array', async () => {
      const res = await chai.request(app).get(mealUrl);
      expect(res.body.meals).to.be.an('array');
    });
    it('should return an empty array on start', async () => {
      const res = await chai.request(app).get(mealUrl);
      expect(res.body.meals).to.have.length(0);
    });
    it('should return an array of meals', async () => {
      await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(meal);
      const res = await chai.request(app).get(mealUrl);
      expect(res.status).to.equal(200);
      expect(res.body.meals.length).to.be.greaterThan(0);
    });
  });

  // Test Get a meal
  describe('Get Meal', () => {
    it('should return one meal', async () => {
      const res = await chai.request(app).get(`${mealUrl}/1`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
    it('should not get meal for wrong id', async () => {
      const res = await chai.request(app).get(`${mealUrl}/3`);
      expect(res.status).to.equal(404);
      expect(res.body.error.id).to
        .include('Meal does not exist');
    });
  });

  // Test Adding a meal
  describe('Add Meal', () => {
    it('should add meal with complete fields', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(meal);
      expect(res).to.have.status(201);
      expect(res.body.meal).to.be.an('object');
      expect(res.body.message).to
        .include('Successfully added meal');
    });
    it('should not allow non auth admin to add meal', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', 'Bearer sdkjsdkjskdjfskdjf')
        .send(meal);
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
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.description)
        .to.include('Meal description is required');
    });
    it('should not add meal without image url', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty image url',
          description: 'I am the description for the meal without image url',
          imageUrl: '',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.imageUrl)
        .to.include('Meal image url is required');
    });
    it('should not add meal with empty image url', async () => {
      const res = await chai.request(app).post(mealUrl)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Meal with empty image url',
          description: 'I am the description for the meal without image url',
          imageUrl: '',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.imageUrl)
        .to.include('Meal image url is required');
    });
  });

  // Test Updating a meal
  describe('Update Meal', () => {
    it('should update meal with correct id', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'super sumptious',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.meal.description).to
        .include('super sumptious');
    });
    it('should not update meal with incorrect id', async () => {
      const res = await chai.request(app).put(`${mealUrl}/3`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'meal with wrong id',
        });
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error.id).to
        .include('Meal id does not exist');
    });
    it('should not update meal with id that is not a number', async () => {
      const res = await chai.request(app).put(`${mealUrl}/a`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'meal with wrong id',
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.id).to
        .include('Meal id must be a number');
    });
    it('should not allow non auth admin to update meal', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'super sumptious',
        });
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to.equal('Forbidden');
    });
  });

  // Test Delete a meal
  describe('Delete Meal', () => {
    it('should delete meal if it exitst', async () => {
      const res = await chai.request(app).del(`${mealUrl}/1`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to
        .include('Meal successfully deleted');
    });
    it('should not delete meal if it does not exist', async () => {
      const res = await chai.request(app).del(`${mealUrl}/3`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(404);
      expect(res.body.error.id).to
        .include('Meal does not exist');
    });
    it('should not allow non auth admin to delete meal', async () => {
      const res = await chai.request(app).del(`${mealUrl}/2`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.error.message).to.equal('Forbidden');
    });
  });
});
