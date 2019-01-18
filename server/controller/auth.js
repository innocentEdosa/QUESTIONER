import { validationResult } from 'express-validator/check';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import databaseConnection from '../models/dbConfig';

import dotenv from 'dotenv';

dotenv.config();

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
      username, email, password, firstname, lastname, othername, phonenumber, isadmin
    } = req.body;
    bcrypt.hash(password, 3)
      .then((hashedpw) => {
        const query = 'INSERT INTO users(username, email, password, firstname, lastname, othername, phonenumber, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [username, email, hashedpw, firstname, lastname, othername, phonenumber, isadmin || false];
        return databaseConnection.query(query, values)
          .then((response) => {
            if (response) {
              const token = jwt.sign(
                { email: response.rows[0].email, userId: response.rows[0].user_id, isAdmin: response.rows[0].isadmin },
                process.env.SECRET,
                { expiresIn: '1h' }
              );
              return res.status(201).json({ data: [{ token, user: response.rows[0] }] });
            }
          })
          .catch(() => res.status(500).json({ error: 'Server error!!! Try again later' }));
      })
      .catch(() => res.status(500).json({ error: 'Server error!!! Try again later' }));
  }

  static Login(req, res) {
    const {
      password, email,
    } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1';
    const value = [email];
    let loadeduser;
    databaseConnection.query(query, value)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'The email or password entered does not match any in the database' });
        }
        loadeduser = user;
        return bcrypt.compare(password, user.rows[0].password);
      })
      .then((isEqual) => {
        if (!isEqual) {
          return res.status(401).json({ error: 'The email or password entered does not match any in the database' });
        }
        const token = jwt.sign({
          email: loadeduser.rows[0].email,
          userId: loadeduser.rows[0].user_id,
        }, process.env.SECRET,
        { expiresIn: '10h' });
        return res.status(200).json({ data: [{ token, user: loadeduser.rows[0], msg: 'login successful' }] });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'server error!!! Try again later' })
      });
  }
}
