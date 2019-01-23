import db from './db';
import Meetup from './meetup';
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
      console.log(err, 'error from question findbyId');
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
      console.log(err);
      return (err);
    }
  }

  static downvote(questionId) {
    const Id = Number(questionId);
    const found = [];
    for (let i = 0; i < db.question.length; i += 1) {
      if (db.question[i].id === Id) {
        db.question[i].downvote += 1;
        found.push(db.question[i]);
        return found;
      }
    }
    return -1;
  }
}
