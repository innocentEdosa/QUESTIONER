import { validationResult } from 'express-validator/check';

import bcrypt from 'bcryptjs';

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
      username, email, password,
    } = req.body;
    bcrypt.hash(password, 3)
      .then((hashedpw) => {
        const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
        const values = [username, email, hashedpw];
        return databaseConnection.query(query, values)
          .then((response) => {
            res.status(201).json({ data: response.rows[0] });
          })
          .catch(() => {
            return res.status(500).json({ error: 'Server error!!! Try again later' });
          });
      })
      .catch(() => {
        return res.status(500).json({ error: 'Server error!!! Try again later' });
      });
  }
}
