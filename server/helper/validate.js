import { body } from 'express-validator/check';
import pool from '../models/dbConfig';

export default class validator {
  static validateMeetup() {
    return [body('location').trim().custom((value) => {
      if (value === undefined || value === "") {
        return Promise.reject('Please enter a location for the meetup');
      }
      if(value.length < 3) {
        return Promise.reject('location must be more than three characters');
      }
      return true;
    }),
      body('topic').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Please enter a topic for your meetup');
        }
        if (value.length < 3) {
          return Promise.reject('Topic must be more than three characters');
        }
        return true;
      }),
    body('tags').trim().optional(),
      body('happeningOn').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Please provide a date for your meetup');
        }
        return true;
      }),
      body('description').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Please enter a description for your meetup');
        }
        if (value.length < 10) {
          return Promise.reject('description must be more than ten characters');
        }
        return true;
      })
    ];
  }

  static validateQuestions() {
    return [
      body('title').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Please enter a title for your question');
        }
        if (value.length < 3) {
          return Promise.reject('Title must be at least three characters long');
        }
        return true;
      }),
      body('meetup').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Please provide a meetup id');
        } let reg = new RegExp('^[0-9]+$');
        if (!reg.test(Number(value))) {
          return Promise.reject('meetup id should be a number');
        }
        return true;
      }),
      body('body', 'body of question required').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Please provide the body of question');
        }
        if (value.length < 3) {
          return Promise.reject('body must be at least three characters long');
        }
        return true;
      })
    ];
  }

  static validateRsvp() {
    return [body('user').trim().custom((value) => {
      if (value === undefined || value === "") {
        return Promise.reject('Please provide a user id');
      } let reg = new RegExp('^[0-9]+$');
      if (!reg.test(Number(value))) {
        return Promise.reject('user id should be a number');
      }
      return true;
    }),
      body('meetup').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Please provide a meetup id');
        } let reg = new RegExp('^[0-9]+$');
        if (!reg.test(Number(value))) {
          return Promise.reject('meetup id should be a number');
        }
        return true;
      }),
    ];
  }

  static validateEmail() {
    return [
      body('email').trim()
        .custom(async (value) => {
          try {
            if (value === undefined || value === "") {
              return Promise.reject('Email is required');
            }
            let reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            if (!reg.test(value)) {
              return Promise.reject('Please enter a valid email');
            }
            return true;
          } catch (error) {
          }
        })
        .normalizeEmail(),]
  }

  static validatePassword() {
    return [
      body('password').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Password is required');
        }
        if (value.length < 5) {
          return Promise.reject('Password cannot be less than five characters')
        }
        return true;
      }),
    ]
  }

  static validatePhonenumber() {
    return [
      body('phoneNumber')
        .custom((value) => {
          if (value === undefined || value === "") {
            return Promise.reject('phone number is required');
          }
          if (value.length < 11 || value.length > 18) {
            return Promise.reject('Please enter a valid phone number')
          }
          let reg = new RegExp('^[0-9]+$');
          if (!reg.test(Number(value))) {
            return Promise.reject('Phone number cannot contain letters');
          }
          return true;
        }),
    ]
  }

  static validateUsername() {
    return [
      body('username').trim().custom((value) => {
        if (value === undefined || value === "") {
          return Promise.reject('Username is required');
        }
        let regexp = /^\S+$/;
        if(!regexp.test(value)) {
          return Promise.reject('Username cannot contain spaces');
        }
        return true;
      })
    ]
  }

  static validateSignup() {
    return [
      body('email').trim()
        .custom(async (value) => {
          try {
            const query = 'SELECT email FROM users WHERE email = ($1)';
            const useremail = [value];
            const response = await pool.query(query, useremail);
            if (response.rows[0]) {
              return Promise.reject('E-mail Address already exists!');
            }
            return true;
          } catch (error) {
          }
        }),
      body('username').trim().custom(async (value) => {
        try {
          const query = 'SELECT username FROM users WHERE username = ($1)';
          const useremail = [value];
          const response = await pool.query(query, useremail);
          if (response.rows[0]) {
            return Promise.reject('Username already exists!');
          }
          return true
        } catch (error) {
        }
      }),
      body('firstname', 'Please enter your firstname').isAlpha().withMessage('firstname cannot contain numbers')
        .not()
        .isEmpty().withMessage('firstname is required'),
      body('lastname', 'Please enter your lastname').isAlpha().withMessage('lastname cannot contain numbers')
        .not()
        .isEmpty().withMessage('Lastname is required'),
      body('othername').isAlpha().optional(),
      body('isAdmin').isBoolean().optional(),
    ];
  }

  static validateComment() {
    return [body('question').trim().custom((value) => {
      if (value === undefined || value === "") {
        return Promise.reject('Please provide a question id');
      } const reg = new RegExp('^[0-9]+$');
      if (!reg.test(Number(value))) {
        return Promise.reject('question id should be a number');
      }
      return true;
    }),
    body('comment', 'Comment is required').trim().not().isEmpty(),
    ];
  }
}
