import supertest from 'supertest';
import chai from 'chai';
import app from '../server/app';

const should = chai.should();

const server = supertest.agent(app);

const mock = {
  email: 'anotheruser@gmail.com',
  username: 'innocent',
  password: 'andelabootcamp',
  "firstname": "inndfco",
  "lastname": "jdisssdfjip",
  "othername": "mather",
  "phoneNumber": "07077427084"
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

  
  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF GIVEN AN ALREADY EXISTING EMAIL OR USERNAME ', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send(mock)
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });


  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF GIVEN A WRONG EMEAIL', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send({
          email: 'ilegbinijieinnocentcareer',
          username: 'innocent2',
          password: 'andelabootcamp',
          "firstname": "inndfco",
          "lastname": "jdisssdfjip",
          "othername": "mather",
          "phoneNumber": "07077427084"
        })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF NOT GIVE A USERNAME', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send({
          email: 'ilegbinijieinnocentcareer',
          password: 'andelabootcamp',
          "firstname": "inndfco",
          "lastname": "jdisssdfjip",
          "othername": "mather",
          "phoneNumber": "07077427084"
        })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF NOT GIVEN EMEAIL', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send({
          email: 'ilegbinijieinnocentcareer',
          password: 'andelabootcamp',
          "firstname": "inndfco",
          "username": 'anotheruser',
          "lastname": "jdisssdfjip",
          "othername": "mather",
          "phonenumber": "07077427084"
        })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF NOT GIVEN EMEAIL', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send()
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });
  
  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF GIVEN A WRONG PHONE NUMBER', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send({
          email: 'ilegbinijieinnocentcareer',
          username: 'innocent2',
          password: 'andelabootcamp',
          "firstname": "inndfco",
          "lastname": "jdisssdfjip",
          "othername": "mather",
          "phoneNumber": "070"
        })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF GIVEN A WRONG PHONE NUMBER', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send({
          email: 'ilegbinijieinnocentcareer@gmail.com',
          username: 'innocent2',
          password: 'andelabootcamp',
          "firstname": "inndfco",
          "lastname": "jdisssdfjip",
          "othername": "mather",
          "phoneNumber": "innoncnd"
        })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD RESPOND WITH 400 AND ERROR MESSAGE IF GIVEN A WRONG PARAMS', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send({
          email: 'ilegbinijieinnocentcareer2@gmail.com',
          username: 'innocent2',
          password: '',
          "firstname": "",
          "lastname": "",
          "othername": "",
          "phoneNumber": "070"
        })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });
});



describe('POST /auth/login', () => {
  it('SHOULD CONFIRM THAT A USER EXISTS', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/login')
        .send({ email: 'anotheruser@gmail.com', password: 'andelabootcamp' })
        .expect(200);
      result.status.should.equal(200);
      result.body.should.be.an('object');
      result.body.should.have.property('data');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD THROW AN ERROR IF GIVEN WRONG PARAMS', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/login')
        .send({ })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });


  it('SHOULD RESPOND WITH 401 AND ERROR MESSAGE IF USER RECORD IS NOT FOUND', async () => {
    try {
      const result = await server
        .post('/api/v1/auth/login')
        .send({ email: 'ilegbinijeer@gmail.com', password: 'andelabootcamp' })
        .expect(401);
      result.status.should.equal(401);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

});



import {mocha} from 'mocha';
import {expect} from 'chai';

it('it should return a user object', () => {
  
})