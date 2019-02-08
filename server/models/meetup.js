import databaseConnection from './dbConfig';

// create a class to handle the meetup array
export default class Meetup {

  static async insertMeetup(location, images, topic, happeningOn, tags, description, userid) {
    try {
      const query = 'INSERT INTO meetups(location, images, topic, "happeningOn", tags, description, "createdBy") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const value = [location, images || 'imagurl', topic, happeningOn, tags || [], description, userid];
      const response = await databaseConnection.query(query, value)
      return response;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  static async noDuplicate(topic, happeningOn, location, createdBy) {
    try {
      const query = 'SELECT * FROM meetups WHERE topic = $1 AND "happeningOn" = $2 AND location = $3 AND "createdBy" = $4';
      const value = [topic, happeningOn, location, createdBy];
      const response = await databaseConnection.query(query, value);
      return response;
    } catch (err) {
      console.log(err);
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
      return err;
    }
  }

  static async deleteMeetup(id) {
    try {
      const query = 'DELETE FROM meetups WHERE id = $1';
      const value = [id];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      return err;
    }
  }

  static async getUpcoming() {
    try {
      const query = 'SELECT * FROM meetups WHERE "happeningOn" > $1 '
      const currentDate = new Date(Date.now());
      const value = [currentDate];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      return (err);
    }
  }

  static async updateMeetup(location, images, topic, happeningOn, tags, description, meetup) {
    try {
      const query = 'UPDATE meetups SET location = $1, images = $2, topic = $3, "happeningOn" = $4, tags = $5, description = $6 WHERE id = $7 RETURNING *';
      const value = [location, images || 'imagurl', topic, happeningOn, tags || [], description, meetup];
      const response = await databaseConnection.query(query, value)
      return response;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }
}
