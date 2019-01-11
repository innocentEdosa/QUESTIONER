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
  /**
   * Testing GET/api/v1/meetups/meetupid endpoint
   */
  it('IT SHOULD RETURN A SPECIFIC MEETUP', (done) => {
    server
      .get('/api/v1/meetups/3')
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

  it('IT SHOULD THROW AN ERROR WHEN REQUEST PARAM IS INVALID', (done) => {
    server
      .get('/api/v1/meetups/bod')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.an('object');
        res.body.should.have.property('status', 404);
        done();
      });
  });
  /**
   * Testing GET/api/v1/meetups/upcoming endpoint
   */
  it('IT SHOULD RETURN ALL UPCOMING MEETUPS', (done) => {
    server
      .get('/api/v1/meetups/3')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        done();
      });
  });
});
