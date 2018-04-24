import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const rooUrl = '/';

describe('Root path', () => {
	it('should return status: 200', async () => {
		const res = await chai.request(app).get(rooUrl);
		expect(res).to.have.status(200);
	});

	it('should return a message', async () => {
		const res = await chai.request(app).get(rooUrl);
		expect(res.body.message).to.equal('Welcome to Book-A-Meal');
	});

	it('should return object response', async () => {
		const res = await chai.request(app).get(rooUrl);
		expect(res.body).to.be.an('object');
	});
});
