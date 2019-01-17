import { body } from 'express-validator/check';
import pool from '../models/dbConfig';

export default class validator {
  static validateMeetup() {
    return [body('location', 'location cannot be undefined').trim().exists(),
      body('topic', 'Topic must be at least 3 characters long').trim().exists().isLength({ min: 3 }),
      body('tags', 'Tags should be sent as an array').trim().optional().isArray(),
      body('happeningOn', 'happeningOn must be defined').trim().exists(),
      body('description', 'description must be defined and more than 10 characters').trim().exists(),
      body('createdBy', 'creadteBy cannot be undefined').trim().exists(),
    ];
  }

  static validateQuestions() {
    return [body('createdBy', 'createdBy cannot be undefined').trim().exists(),
      body('title', 'Title must be at least 3 characters long').trim().exists().isLength({ min: 3 }),
      body('meetup', 'meetup cannot be undefined').trim().exists().isNumeric(),
      body('body', 'body cannot be undefined').trim().exists(),
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
      body('firstname').isAlpha().isLength({ min: 3 }).withMessage('Please enter a valid firstname. Firstname must be more than 2 letters'),
      body('lastname').isAlpha().isLength({ min: 3 }).withMessage('Please enter a valid lastname. lastname must be more than 2 letters'),
      body('phonenumber').isNumeric().isLength({ min: 11, max: 11 }).withMessage('Please enter a valid Phonenumber.'),
      body('othername').isAlpha().optional(),
    ];
  }
}
