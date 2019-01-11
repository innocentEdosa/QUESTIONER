import chai from 'chai';
import supertest from 'supertest';
import app from '../server/app';

const should = chai.should();

const server = supertest.agent(app);

describe('TEST ALL MEETUP ENDPOINTS', () => {
  /**
   * Testing GET/api/v1/meetups endpoint
   */
  it('IT SHOULD RETURN ALL MEETUPS', (done) => {
    server
      .get('/api/v1/meetups')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status', 200);
        done();
      });
  });

  /**
   * Testing POST/api/v1/meetups endpoint
   */
  it('IT SHOULD CREATE A NEW MEETUP', (done) => {
    server
      .post('/api/v1/meetups')
      .send({
        location: 'rttg ',
        topic: 'this is a topic',
        tags: ['business'],
        description: 'this is anohter',
        createdBy: 'mut be inncone',
        images: 'this is an aeir',
        happeningOn: 'new Date()',
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.an('object');
        res.body.should.have.property('status', 201);
        res.body.should.have.property('data');
        done();
      });
  });
});
