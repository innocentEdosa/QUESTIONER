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
  static async Signup(req, res) {
    try {
      const error = validationResult(req);
      const errormsg = await util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      const {
        username, email, password, firstname, lastname, othername, phonenumber, isadmin
      } = req.body;
      bcrypt.hash(password, 3)
        .then(async (hashedpw) => {
          const query = 'INSERT INTO users(username, email, password, firstname, lastname, othername, phonenumber, "isAdmin") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, username, email, firstname, lastname, othername, phonenumber, "isAdmin"';
          const values = [username, email, hashedpw, firstname, lastname, othername, phonenumber, isadmin || false];
          try {
            const response = await databaseConnection.query(query, values);
            if (response.rows[0]) {
              const { email, id, isAdmin } = response.rows[0];
              const token = jwt.sign({ email: email, userId: id, isAdmin: isAdmin }, process.env.SECRET, { expiresIn: '10h' });
              return res.status(201).json({ data: [{ token: token, user: response.rows[0] }] });
            }
          }
          catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Server error!!! Try again later' });
          }
        })
    }
    catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Server error!!! Try again later' });
    }
  }


  static async Login(req, res) {
    try {
      const {
        password, email,
      } = req.body;
      const query = 'SELECT id, username, firstname, lastname, othername, email, phonenumber,password, "isAdmin" FROM users WHERE email = $1';
      const value = [email];
      let loadeduser;
      const user = await databaseConnection.query(query, value);
      if (user) {
        if (!user.rows[0]) {
          return res.status(401).json({ error: 'The email or password entered does not match any in the database' });
        }
        loadeduser = user;
        const check = await bcrypt.compare(password, user.rows[0].password);
        if (!check) {
          return res.status(401).json({ error: 'The email or password entered does not match any in the database' });
        }
        const { email, id, isAdmin, lastname, username, phonenumber, othername} = loadeduser.rows[0]
        const token = jwt.sign({ email: email, userId: id, isAdmin: isAdmin }, process.env.SECRET, { expiresIn: '10h' });
        return res.status(200).json({ data: [{ token, user: { lastname: lastname, username: username, email: email, phonenumber: phonenumber, othername: othername } }]});
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'server error!!! Try again later' })
    }
  }
}
