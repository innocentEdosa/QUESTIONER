import chai from 'chai';
import supertest from 'supertest';
import app from '../server/app';

const should = chai.should();

const server = supertest.agent(app);

const Admin = {
  username: 'superuser',
  firstname: 'innocent',
  lastname: 'jdisssdddfjip',
  othername: 'mather',
  email: 'super@gmail.com',
  password: 'edosafd',
  phonenumbe: '07057443455',
  isadmin: true,
}

let token;

before(async () => {
  try {
    const result = await server
      .post('/api/v1/auth/signup')
      .send(Admin)
    token = result.body.data[0].token;
  } catch (error) {
    console.log(error);
  }
});


describe('TEST ALL MEETUP ENDPOINTS', () => {
  
   
  it('SHOULD CREATE A NEW MEETUP', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups')
        .set('Authorization', token)
        .send({
          location: 'rttccccg',
          topic: 'this is a topic',
          tags: ['business'],
          description: 'this is anfffohter',
          createdBy: 1,
          images: 'this is an aeir',
          happeningOn: 'new Date()',
        })
        .expect(201);
      result.status.should.equal(201);
      result.body.should.be.an('object');
      result.body.should.have.property('data');
    } catch (error) {
      console.log(error);
    }
  });

  it('IT SHOULD THROW AN ERROR WHEN GIVEN INCOMPLETE PARAMS', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups')
        .set('Authorization', token)
        .send({
          location: 'rttg',
          topic: 'this is a topic',
          tags: ['business'],
        })
        .expect(422);
      res.status.should.equal(422);
      res.body.should.be.an('object');
      res.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

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

describe('TEST ALL QUESTION ENDPOINTS', () => {
  /**
   * Testing POST/api/v1/questions endpoint
   */
  it('IT SHOULD CREATE A NEW QUESTION', (done) => {
    server
      .post('/api/v1/questions')
      .send({
        createdBy: 2,
        title: 'the fouth question',
        meetup: 3,
        body: 'this is the body',
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

  it('IT SHOULD THROW AN ERROR WHEN GIVEN NON EXISTING MEETUP PARAMS', (done) => {
    server
      .post('/api/v1/questions')
      .send({
        createdBy: 2,
        title: 'this is the title of a question',
        body: 'this is the body of a question',
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.an('object');
        res.body.should.have.property('status', 404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('IT SHOULD THROW AN ERROR WHEN GIVEN INCOMPLETE PARAMS', (done) => {
    server
      .post('/api/v1/questions')
      .send({
        createdBy: 2,
        meetup: 3,
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.should.be.an('object');
        done();
      });
  });


  /**
   * Testing PATCH/api/v1/questions/questionid/upvote endpoint
   */
  it('IT SHOULD UPVOTE A QUESTION', (done) => {
    server
      .patch('/api/v1/questions/1/upvote')
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

  it('IT SHOULD THROW AN ERROR WHEN GIVEN A NON EXISTING MEETUP', (done) => {
    server
      .patch('/api/v1/questions/BOY/upvote')
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

  it('IT SHOULD DOWNVOTE A QUESTION', (done) => {
    server
      .patch('/api/v1/questions/1/downvote')
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

  it('IT SHOULD THROW AN ERROR WHEN SENT NON EXISTING MEETUP', (done) => {
    server
      .patch('/api/v1/questions/wrong/downvote')
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
});

describe('TEST ALL RSVP ENDPOINT', () => {
  /**
   * Testing POST/api/v1/meetups/meetupid/rsvp endpoint
   */
  it('IT SHOULD CREATE A NEW RSVP', (done) => {
    server
      .post('/api/v1/meetups/3/rsvp')
      .send({
        user: 'innocent',
        response: 'maybe',
        meetup: 3,
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

  it('IT SHOULD THROW AN ERROR WHEN GIVEN NON EXISTING MEETUPPARAMS', (done) => {
    server
      .post('/api/v1/meetups/3/rsvp')
      .send({
        response: 'maybe',
        user: 2,
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.an('object');
        res.body.should.have.property('status', 404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('IT SHOULD THROW AN ERROR WHEN GIVEN INCOMPLETE PARAMS', (done) => {
    server
      .post('/api/v1/meetups/3/rsvp')
      .send({
        response: 'maybe',
        meetup: 3,
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.should.be.an('object');
        done();
      });
  });
});
