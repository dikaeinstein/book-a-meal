import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import users from './usersTestData';

const { expect } = chai;

chai.use(chaiHttp);

const signUpUrl = '/api/v1/auth/signup';
const signInUrl = '/api/v1/auth/signin';
const userUrl = '/api/v1/users';

let token;

// Test User Sign Up
describe('User Sign Up', () => {
  it('should create user with right credentials', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send(users[6]);
    expect(res.status).to.equal(201);
    expect(res.body.user.name).to.equal(users[6].name);
    expect(res.body.user.email).to.equal(users[6].email);
    expect(res.body).not.to.have.property('password');
  });
  it('should not create user with wrong email format', async () => {
    const res = await chai.request(app).post(`${signUpUrl}`)
      .send({
        name: 'Sarada Uchiha',
        email: 'sarada.uchiha.com',
        password: '1234567890',
        confirmPassword: '1234567890',
        role: 'customer',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.email)
      .to.include('Email address is invalid or empty');
  });
  it('should not create user with an empty username field ', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send({
        name: '',
        email: 'dikaeinstein@andela.com',
        password: '1234567890',
        confirmPassword: '1234567890',
        role: 'customer',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.name)
      .to.include('Name is required');
  });
  it('should not create user with name less than 3 characters', async () => {
    const res = await chai.request(app).post(`${signUpUrl}`)
      .send({
        name: 'dd',
        email: 'dikaeinstein@andela.com',
        password: '1234567890',
        confirmPassword: '1234567890',
        role: 'customer',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.name)
      .to.include('Name can only be from 3 to 30 characters');
  });
  it('should not create user with name more than 30 characters', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send({
        name: 'extemely lllllloooooooonnnnnnnnnngggggggggggg',
        email: 'kinshiki@momoki.com',
        password: '1234567890',
        confirmPassword: '1234567890',
        role: 'customer',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.name)
      .to.include('Name can only be from 3 to 30 characters');
  });
  it('should not create user with an already existing email', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send(users[0]);
    expect(res.status).to.equal(422);
    expect(res.body).to.be.an('object');
    expect(res.body.error.email).to.include('Email already exist');
  });
  it('should not create user with less than 6 password characters', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send({
        name: 'Nara Shikamaru',
        email: 'nara.shika@leaf.com',
        password: '123',
        confirmPassword: '123',
        role: 'customer',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.password).to
      .include('Password can only be from 6 to 30 characters');
  });
  it('should not create user with an empty email field ', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send({
        name: 'Hyuga Hinata',
        email: '',
        password: '1234567890',
        confirmPassword: '1234567890',
        role: 'customer',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.email)
      .to.include('Email is required');
  });
  it('should not create user with an empty password field ', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send({
        name: 'Sakura Chan',
        email: 'saku.ra@gg.com',
        password: '',
        confirmPassword: '1234567890',
        role: 'customer',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.password)
      .to.include('Password is required');
  });
  it('should not create user if passwords do not match', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send({
        name: 'Rock Lee',
        email: 'lee.rock@email.com',
        password: '1234567890',
        confirmPassword: '0987654321',
        role: 'customer',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.confirmPassword).to
      .include('Passwords do not match');
  });
  it('should not create user if role does not match allowed values', async () => {
    const res = await chai.request(app).post(signUpUrl)
      .send({
        name: 'Rock Lee',
        email: 'lee.rock@email.com',
        password: '1234567890',
        confirmPassword: '1234567890',
        role: 'customer1',
      });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.be.an('object');
    expect(res.body.error.role).to
      .include('User role must be either customer or caterer');
  });
});

// Test User Sign in
describe('User Sign In', () => {
  it('should signin user with correct details', async () => {
    const res = await chai.request(app).post(signInUrl)
      .send(users[0]);
    token = res.body.token;
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.user.email).to.equal(users[0].email);
    expect(res.body.user).to.have.property('name');
    expect(res.body.user).to.not.have.property('password');
    expect(res).to.have.header('Authorization');
  });
  it('should not sign in user without password', async () => {
    const res = await chai.request(app).post(signInUrl)
      .send({
        email: 'gaara@sand.com',
        password: '',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.password).to.equal('Password is required');
  });
  it('should not sign in user without email address', async () => {
    const res = await chai.request(app).post(signInUrl)
      .send({
        email: '',
        password: 'password',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
    expect(res.body.error.email).to.equal('Email is required');
  });
  it('should not sign in user with an incorrect password', async () => {
    const res = await chai.request(app).post(signInUrl)
      .send({
        email: 'solozyokwa@gmail.com',
        password: 'wrongpasswordgg.com',
      });
    expect(res).to.have.status(401);
    expect(res.body).to.be.an('object');
    expect(res.body.error.password)
      .to.equal('You entered a wrong password');
  });
  it('should not sign in user with an incorrect email', async () => {
    const res = await chai.request(app).post(signInUrl)
      .send({
        email: 'wrongemail@gg.com',
        password: '1234567890',
      });
    expect(res.status).to.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.error.email)
      .to.equal('User does not exist');
  });
});

// Test Delete User account
describe('Delete user account', () => {
  it('should allow auth user delete their account', async () => {
    const res = await chai.request(app).del(`${userUrl}/1`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('User account deleted successfully');
    expect(res.body.status).to.equal('success');
  });
  it('should not delete user account if doesn\'t exist', async () => {
    const res = await chai.request(app).del(`${userUrl}/500`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.be.an('object');
    expect(res.body.error.message).to.equal('User not found');
  });
});
