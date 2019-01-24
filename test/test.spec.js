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
  phonenumber: '07057443455',
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
      result.status.should.equal(422);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

 
    it('should get all meetup', async () => {
      try {
        const res = await server
          .get('/api/v1/meetups/')
          .set('Accept', 'application/json')
          .set('Authorization', token)
       res.status.should.equal(200);
      } catch (error) {
        console.log(error);
      }
    });

  it('should get a specific meetup', async () => {
    try {
      const res = await server
        .get('/api/v1/meetups/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
     res.status.should.equal(200);
    } catch (error) {
      console.log(error);
    }
  });

});

describe('TEST ALL QUESTION ENDPOINTS', () => {
  /**
   * Testing POST/api/v1/questions endpoint
   */
  it('IT SHOULD CREATE A QUESTION', async () => {
    try {
      const result = await server
        .post('/api/v1/questions')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "meetup": 1,
          "title": "This is a test title",
          "body": "This is the test body"
        })
      result.status.should.equal(201);
    } catch (err) {
      console.log(err, 'This is from the create question test')
    }
  });

  it('IT SHOULD THROW AN ERROR WHEN GIVEN INCORRECT PARAMS FOR QUESTIONS', async () => {
    try {
      const result = await server
        .post('/api/v1/questions')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "meetup": 1,
          "title": "",
          "body": ""
        })
      result.status.should.equal(422);
      result.body.should.be.an('object');
    } catch (err) {
      console.log(err, 'This is from the create question test')
    }
  });

  it('IT SHOULD THROW AN ERROR WHEN GIVEN NON EXISTING MEETUP ID', async () => {
    try {
      const result = await server
        .post('/api/v1/questions')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "meetup": 180,
          "title": "This is a test title",
          "body": "This is the test body"
        })
      result.status.should.equal(404);
    } catch (err) {
      console.log(err, 'This is from non existing meetupid')
    }
  });


  /**
   * Testing PATCH/api/v1/questions/questionid/upvote endpoint
   */
  it('IT SHOULD UPVOTE A QUESTION', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/1/upvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(200);
      result.body.should.have.property('data');
    } catch (err) {
      console.log(err, 'This is from upvoting question');
    }
  });

  it('IT SHOULD THROW A 404 ERROR WHEN GIVEN A NON EXISTING QUESTION ID', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/1000/upvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(404);
      result.body.should.have.property('error');
    } catch (err) {
      console.log(err, 'This is from upvoting wrong question');
    }
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
})
