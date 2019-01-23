import { body } from 'express-validator/check';
import pool from '../models/dbConfig';

export default class validator {
  static validateMeetup() {
    return [body('location', 'Please enter a correct location for the meetup! ')
      .trim()
      .exists()
      .not()
      .isEmpty(),
    body('topic', 'Please enter a topic. Topic should be more that 3 characters').trim().exists().isLength({ min: 3 })
      .not()
      .isEmpty(),
    body('tags', 'Tags should be sent as an array').trim().optional().isArray()
      .not()
      .isEmpty(),
    body('happeningOn', 'Please enter a date for your meetup').trim().exists()
      .not()
      .isEmpty(),
    body('description', 'description for your meetup must be more than 10 characters').trim().exists().not()
      .isEmpty(),
    ];
  }

  static validateQuestions() {
    return [
      body('title', 'Title must be at least 3 characters long').trim().isLength({ min: 3 })
        .not()
        .isEmpty()
        .withMessage('Please provide valid title for your question'),
      body('meetup', 'Please provide a valid meetupId').trim().exists().isNumeric()
        .not()
        .isEmpty(),
      body('body', 'Please provide body of your question').trim().exists()
        .not()
        .isEmpty(),
    ];
  }

  static validateRsvp() {
    return [body('user', 'user cannot be undefined').trim().exists(),
      body('response', 'response must be at least 3 characters long').trim().exists().isLength({ min: 3 }),
      body('meetup', 'meetup cannot be undefined').trim().exists().isNumeric(),
    ];
  }

  static validateSignup() {
    return [
      body('email').isEmail().withMessage('Please enter a valid email')
        .custom((value) => {
          const query = 'SELECT email FROM users WHERE email = ($1)';
          const useremail = [value];
          return pool.query(query, useremail)
            .then((response) => {
              if (response.rows[0]) {
                return Promise.reject('E-mail Address already exists!');
              }
              return true;
            });
        })
        .normalizeEmail(),
      body('username').exists().trim().custom((value) => {
        const query = 'SELECT username FROM users WHERE username = ($1)';
        const userName = [value];
        return pool.query(query, userName)
          .then((response) => {
            if (response.rows[0]) {
              return Promise.reject('Username already exists!');
            }
            return true;
          });
      })
        .not()
        .isEmpty()
        .withMessage('Please enter a valid username'),
      body('password').trim().isLength({ min: 5 }).not()
        .isEmpty()
        .withMessage('Password should be more than five characters'),
      body('firstname', 'please enter a valid firstname').isAlpha().isLength({ min: 3 }).withMessage('Please enter a valid firstname. Firstname must be more than 2 letters')
        .not()
        .isEmpty(),
      body('lastname', 'please enter a valid lastname').isAlpha().isLength({ min: 3 }).withMessage('Please enter a valid lastname. lastname must be more than 2 letters')
        .not()
        .isEmpty(),
      body('phonenumber', 'please enter a valid phone number').isNumeric().isLength({ min: 11, max: 18 }).withMessage('Please enter a valid Phonenumber.').not().isEmpty(),
      body('othername').isAlpha().optional(),
    ];
  }
}
