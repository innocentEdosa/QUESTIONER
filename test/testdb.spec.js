import supertest from 'supertest';
import chai from 'chai';
import app from '../server/app';

const should = chai.should();

const server = supertest.agent(app);

const mock = {
  email: 'ilegbinijieinnocentcareer@gmail.com',
  username: 'innocent',
  password: 'andelabootcamp',
  "firstname": "inndfco",
  "lastname": "jdisssdfjip",
  "othername": "mather",
  "phonenumber": "07077427084"
};

describe('POST /auth/signup', () => {
  it('should create a user record', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send(mock)
        .expect(201);
        result.status.should.equal(201);
        result.body.should.be.an('object');
        result.body.should.have.property('data');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD RESPOND WITH 422 AND ERROR MESSAGE IF GIVEN AN ALREADY EXISTING EMAIL OR USERNAME ', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send(mock)
        .expect(422);
      result.status.should.equal(422);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });
});
