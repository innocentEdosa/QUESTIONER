import db from './db';
import databaseConnection from './dbConfig';

// create a class to handle the meetup array
export default class Meetup {

  static async insertMeetup(location, images, topic, happeningOn, tags, description, userid) {
    try {
      const query = 'INSERT INTO meetups(location, images, topic, "happeningOn", tags, description, createdBy) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const value = [location, images || 'imagurl', topic, happeningOn, tags || [], description, userid];
      const response = await databaseConnection.query(query, value)
      return response;
    }
    catch (err) {
      console.log(err, 'error from insert meetups');
      return err;
    }
  }

  static async findbyId(meetup) {
    try {
      const query = 'SELECT * FROM meetups WHERE id = $1';
      const value = [meetup];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      console.log(err, 'error from meetup findbyId');
      return err;
    }
  }
}
