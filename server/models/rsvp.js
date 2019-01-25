/**
 * @module dbconfig
 * @module Meetup
 */
import databaseConnection from './dbConfig';

/**
 * create a rsvp model
 */
export default class Rsvp {
  static async create(meetup, user, response) {
    try {
      const query = 'INSERT INTO rsvps(meetup, userId, response) VALUES($1, $2, $3) RETURNING *';
      const value = [meetup, user, response];
      const res = await databaseConnection.query(query, value)
      return res;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  static async check(meetup, user) {
    try {
      const query = 'SELECT * FROM rsvps WHERE userId = $1 AND meetup = $2';
      const value = [user, meetup];
      const res = await databaseConnection.query(query, value)
      return res;
    } catch (err) {
      console.log(err)
      return err;
    }
  }

  static async update(meetup, user, response, id) {
    try {
      const query = 'UPDATE rsvps SET meetup = $1, userId = $2, response = $3 WHERE id = $4 RETURNING *';
      const value = [meetup, user, response, id];
      const res = await databaseConnection.query(query, value)
      return res;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }
}
