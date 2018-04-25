import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const mealUrl = '/api/v1/meals';

const meal = {
  id: 1,
  name: 'Spaghetti with meat balls',
  description: 'Some dummy description',
  imageUrl: 'https://mydummyimgurl.com',
};

describe('Meals', () => {
  describe('Get All Meals', () => {
    it('should return status 200', async () => {
      const res = await chai.request(app).get(mealUrl);
      expect(res).to.have.status(200);
    });
    it('should return an array', async () => {
      const res = await chai.request(app).get(mealUrl);
      expect(res.body).to.be.an('array');
    });
    it('should return an empty array on start', async () => {
      const res = await chai.request(app).get(mealUrl);
      expect(res.body).to.have.length(0);
    });
    it('should return an array of meals', async () => {
      await chai.request(app).post(mealUrl).send(meal);
      const res = await chai.request(app).get(mealUrl);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

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

  describe('Add Meal', () => {
    it('should add meal with complete fields', async () => {
      const res = await chai.request(app).post(mealUrl)
        .send(meal);
      expect(res).to.have.status(201);
      expect(res.body.meal).to.be.an('object');
      expect(res.body.message).to
        .include('Successfully added meal');
    });
    it('should not add meal without name', async () => {
      const res = await chai.request(app).post(mealUrl)
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
  });
  it('should not add meal without image url', async () => {
    const res = await chai.request(app).post(mealUrl)
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

  describe('Update Meal', () => {
    it('should update meal with correct id', async () => {
      const res = await chai.request(app).put(`${mealUrl}/1`)
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
        .send({
          description: 'meal with wrong id',
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.id).to
        .include('Meal id must be a number');
    });
  });

  describe('Delete Meal', () => {
    it('should delete meal if it exitst', async () => {
      const res = await chai.request(app).del(`${mealUrl}/1`);
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to
        .include('Meal successfully deleted');
    });
    it('should not delete meal if it does not exist', async () => {
      const res = await chai.request(app).del(`${mealUrl}/3`);
      expect(res.status).to.equal(404);
      expect(res.body.error.id).to
        .include('Meal does not exist');
    });
  });
});
