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
  phoneNumber: '07057443455',
  isadmin: 'TRUE',
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
  it('should throw an error if there is no upcoming meetups', async () => {
    try {
      const res = await server
        .get('/api/v1/meetups/upcoming')
        .set('Accept', 'application/json')
        .set('Authorization', token)
      res.status.should.equal(404);
    } catch (error) {
      console.log(error);
    }
  });
  it('should throw an error if there is no meetups', async () => {
    try {
      const res = await server
        .get('/api/v1/meetups/10')
        .set('Accept', 'application/json')
        .set('Authorization', token)
      res.status.should.equal(404);
    } catch (error) {
      console.log(error);
    }
  });
  
  it('should throw an error if given wrong meetup id', async () => {
    try {
      const res = await server
        .get('/api/v1/meetups/innocent')
        .set('Accept', 'application/json')
        .set('Authorization', token)
      res.status.should.equal(422);
    } catch (error) {
      console.log(error);
    }
  });
   
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
          createdBy: 2,
          images: 'this is an aeir',
          happeningOn: new Date(2021, 12, 12),
        })
        .expect(201);
      result.status.should.equal(201);
      result.body.should.be.an('object');
      result.body.should.have.property('data');
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD THROW AN ERROR WHEN GIVEN NO PARAMETERS', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups')
        .set('Authorization', token)
        .send({
        })
        .expect(400);
      result.status.should.equal(400);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
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
        .expect(400);
      result.status.should.equal(400);
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

  it('should get all upcoming meetup', async () => {
    try {
      const res = await server
        .get('/api/v1/meetups/upcoming')
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
      result.status.should.equal(400);
      result.body.should.be.an('object');
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
        .send({})
      result.status.should.equal(400);
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

  it('IT SHOULD THROWN AN ERROR IS USER TRIES TO VOTE TWICE', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/1/upvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(409);
      result.body.should.have.property('error');
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

  it('IT SHOULD THROW A 404 ERROR WHEN GIVEN A NON EXISTING QUESTION ID', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/innocent/upvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(422);
      result.body.should.have.property('error');
    } catch (err) {
      console.log(err, 'This is from upvoting wrong question');
    }
  });


  it('IT SHOULD DOWNVOTE A QUESTION', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/1/downvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(200);
      result.body.should.have.property('data');
    } catch (err) {
      console.log(err);
    }
  });

  it('IT SHOULD DOWNVOTE A QUESTION', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/1/downvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(409);
      result.body.should.have.property('error');
    } catch (err) {
      console.log(err);
    }
  });

  it('IT SHOULD THROW A 404 ERROR WHEN GIVEN A NON EXISTING QUESTION ID', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/1000/downvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(404);
      result.body.should.have.property('error');
    } catch (err) {
      console.log(err, 'This is from upvoting wrong question');
    }
  });

  it('IT SHOULD THROW A 404 ERROR WHEN GIVEN A NON EXISTING QUESTION ID', async () => {
    try {
      const result = await server
        .patch('/api/v1/questions/innocent/downvote')
        .set('Authorization', token)
        .set('Accept', 'application/json')
      result.status.should.equal(422);
      result.body.should.have.property('error');
    } catch (err) {
      console.log(err, 'This is from upvoting wrong question');
    }
  });


});

describe('TEST ALL RSVP ENDPOINT', () => {
  /**
   * Testing POST/api/v1/meetups/meetupid/rsvp endpoint
   */
  it('IT SHOULD CREATE A NEW RSVP', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups/1/rsvp')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "meetup": 1,
          "user": 2,
          "response": "maybe"
        })
      result.status.should.equal(201);
    } catch (err) {
      console.log(err)
    }
  });

  it('IT SHOULD THROW AN ERROR WHEN GIVEN NON EXISTING MEETUPPARAMS', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups/1/rsvp')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "meetup": 100,
          "user": 2,
          "response": "maybe"
        })
      result.status.should.equal(404);
    } catch (err) {
      console.log(err)
    }
  });

  it('IT SHOULD THROW AN ERROR WHEN GIVEN INCOMPLETE PARAMS', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups/1/rsvp')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "meetup": 100,
          "user": 2,
        })
      result.status.should.equal(400);
    } catch (err) {
      console.log(err, 'This is from the create rsvp test')
    }
  })
})

describe('TEST ALL COMMENT ENDPOINT', () => {
  /**
   * Testing POST/api/v1/meetups/meetupid/rsvp endpoint
   */
  it('IT SHOULD CREATE A NEW COMMENT', async () => {
    try {
      const result = await server
        .post('/api/v1/comments')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "question": 1,
          "comment": "this is the comments body"
        })
      result.status.should.equal(201);
    } catch (err) {
      console.log(err, 'This is from the create comment test')
    }
  });

  it('IT SHOULD THROW AN ERROR IS WRONG PARAMETERS ARE SENT', async () => {
    try {
      const result = await server
        .post('/api/v1/comments')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "question": 1
        })
      result.status.should.equal(400);
    } catch (err) {
      console.log(err, 'This is from the create comment test')
    }
  });

  it('IT SHOULD THROW AN ERROR IS WRONG PARAMETERS ARE SENT', async () => {
    try {
      const result = await server
        .post('/api/v1/comments')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .send({
          "comment": "this is the comment to a question"
        })
      result.status.should.equal(400);
    } catch (err) {
      console.log(err, 'This is from the create comment test')
    }
  })
});

const notAdmin = {
  username: 'supderuser',
  firstname: 'innocent',
  lastname: 'jdisssdddfjip',
  othername: 'mather',
  email: 'super2@gmail.com',
  password: 'edosafd',
  phoneNumber: '07057443455',
  isadmin: 'FALSE',
}

let notAdminToken;

describe('NON ADMIN', () => {
  before(async () => {
    try {
      const result = await server
        .post('/api/v1/auth/signup')
        .send(notAdmin)
      notAdminToken = result.body.data[0].token;
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD THROWN AN ERROR IF USER IS NOT AN ADMIN', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups')
        .set('Authorization', notAdminToken)
        .send({
          location: 'rttccccg',
          topic: 'this is a topic',
          tags: ['business'],
          description: 'this is anfffohter',
          createdBy: 3,
          images: 'this is an aeir',
          happeningOn: 'new Date()',
        })
        .expect(401);
      result.status.should.equal(401);
    } catch (error) {
      console.log(error);
    }
  });

  it('SHOULD THROWN AN ERROR IF GIVEN WRONG TOKEN', async () => {
    try {
      const result = await server
        .post('/api/v1/meetups')
        .set('Authorization', 'dfdfdsfsfsdf')
        .send({
          location: 'rttccccg',
          topic: 'this is a topic',
          tags: ['business'],
          description: 'this is anfffohter',
          createdBy: 3,
          images: 'this is an aeir',
          happeningOn: 'new Date()',
        })
        .expect(401);
      result.status.should.equal(401);
    } catch (error) {
      console.log(error);
    }
  });

  it('IT SHOULD THROWN AN ERROR IF USER IS NOT ADMIN', async () => {
    try {
      const res = await server
        .delete('/api/v1/meetups/1')
        .set('Accept', 'application/json')
        .set('Authorization', notAdminToken)
      res.status.should.equal(401);
      result.body.should.be.an('object');
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });
});

describe('DELETE A MEETUP', () => {
  it('IT SHOULD DELETE A MEETUP', async () => {
    try {
      const res = await server
        .delete('/api/v1/meetups/1')
        .set('Accept', 'application/json')
        .set('Authorization', token)
      res.status.should.equal(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('IT SHOULD DELETE A MEETUP', async () => {
    try {
      const res = await server
        .delete('/api/v1/meetups/12')
        .set('Accept', 'application/json')
        .set('Authorization', token)
      res.status.should.equal(404);
    } catch (error) {
      console.log(error);
    }
  });
});

