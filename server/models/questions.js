import databaseConnection from './dbConfig';


export default class Question {
  static async findbyId(questionId) {
    try {
      const query = 'SELECT * FROM questions WHERE id = $1';
      const value = [questionId];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      return err;
    }
  }

  static async findbyMeetup(meetup) {
    try {
      const query = 'SELECT * FROM questions WHERE meetup = $1 ORDER BY id DESC';
      const value = [meetup];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  static async findbyUser(userid) {
    try {
      const query = 'SELECT username, "phoneNumber", email, registered FROM users INNER JOIN questions ON users.id = questions."createdBy" WHERE users.id = $1';
      const value = [userid];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  static async updatevotes(questionupvotes, questionvotes, questiondownvote, questionId) {
    try {
      const query = 'UPDATE questions SET upvotes = $1, votes = $2, downvotes = $3 WHERE id = $4 RETURNING *';
      const value = [questionupvotes, questionvotes, questiondownvote, questionId];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      return (err);
    }
  }

  static async insertQuestion(createdBy, title, meetup, body) {
    try {
      const query = 'INSERT INTO questions("createdBy", title, meetup, body) VALUES($1, $2, $3, $4) RETURNING *';
      const value = [createdBy, title, meetup, body]
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch(err) {
      return err;
    }
  }
}
