import { validationResult } from 'express-validator/check';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import databaseConnection from '../models/dbConfig';

import dotenv from 'dotenv';

dotenv.config();

import util from '../helper/util';

export default class authController {
  static async Signup(req, res) {
    try {
      const error = validationResult(req);
      const errormsg = await util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      const {
        username, email, password, firstname, lastname, othername, phoneNumber, isadmin
      } = req.body;
      bcrypt.hash(password, 3)
        .then(async (hashedpw) => {
          const query = 'INSERT INTO users(username, email, password, firstname, lastname, othername, "phoneNumber", "isAdmin") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, username, email, firstname, lastname, othername, "phoneNumber", "isAdmin", registered';
          const values = [username, email, hashedpw, firstname, lastname, othername, phoneNumber, isadmin || 'FALSE'];
          try {
            const response = await databaseConnection.query(query, values);
            if (response.rows[0]) {
              const { email, id, isAdmin, lastname, username, phoneNumber, firstname, othername, registered} = response.rows[0];
              const token = jwt.sign({ userId: id, isAdmin: isAdmin }, process.env.SECRET, { expiresIn: '10h' });
              return res.status(201).json({ data: [{ token: token, user: { id: id, firstname: firstname, lastname: lastname, othername: othername, email: email, phoneNumber: phoneNumber, username: username, registered: registered } }] });
            }
          }
          catch (e) {
            return res.status(500).json({ error: 'Server error!!! Try again later' });
          }
        })
    }
    catch (e) {
      return res.status(500).json({ error: 'Server error!!! Try again later' });
    }
  }


  static async Login(req, res) {
    try {
      const error = validationResult(req);
      const errormsg = await util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      const {
        password, email,
      } = req.body;
      const query = 'SELECT id, username, firstname, lastname, othername, email, "phoneNumber",password, "isAdmin", registered FROM users WHERE email = $1';
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
        const { email, id, isAdmin, lastname, username, phoneNumber, othername, firstname, registered} = loadeduser.rows[0]
        const token = jwt.sign({ userId: id, isAdmin: isAdmin }, process.env.SECRET, { expiresIn: '10h' });
        return res.status(200).json({ data: [{ token, user: { firstname: firstname, lastname: lastname, othername: othername, email: email, phoneNumber: phoneNumber, username: username, registered: registered } }]});
      }
    }
    catch (err) {
      res.status(500).json({ error: 'server error!!! Try again later' })
    }
  }

  static async Verify(req, res) {
    try {
      const status = req.isadmin;
      const userid = req.user_id;
      if (status && userid) {
       return res.status(200).json({status: 200, data: [{status: status, userid: userid}]})
      }
      return res.status(404).json({status: 404, error: 'false token'});
    } catch (error) {
      console.log(errors);
      return res.status(500).json({status: 500, error: 'Server error!!! Try again  later'});
    }
  }
}
