import { validationResult } from 'express-validator/check';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import databaseConnection from '../models/dbConfig';

import util from '../helper/util';


export default class authController {
  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   * Hash password using bcrypt
   * if hash is successful run query to create a user record
   * run query to insert user record
   * if query is successful send success response
   * if query fails send error response
   * if hash fails sends server error response
   */
  static Signup(req, res) {
    const error = validationResult(req);
    util.errorCheck(error, res);
    const {
      username, email, password, firstname, lastname, othername, phonenumber,
    } = req.body;
    bcrypt.hash(password, 3)
      .then((hashedpw) => {
        const query = 'INSERT INTO users(username, email, password, firstname, lastname, othername, phonenumber) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [username, email, hashedpw, firstname, lastname, othername, phonenumber];
        return databaseConnection.query(query, values)
          .then((response) => {
            if (response) {
              const token = jwt.sign(
                { email: response.rows[0].email, userId: response.rows[0].user_id, isAdmin: response.rows[0].isAdmin },
                'thisismyusersecretsecret',
                { expiresIn: '1h' }
              );
              return res.status(201).json({ data: [{ token, user: response.rows[0] }] });
            }
          })
          .catch(() => res.status(500).json({ error: 'Server error!!! Try again later' }));
      })
      .catch(() => res.status(500).json({ error: 'Server error!!! Try again later' }));
  }
}
