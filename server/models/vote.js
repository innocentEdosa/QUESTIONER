import databaseConnection from './dbConfig';

export default class Votes {
  static async getvotes(createdBy, questionId) {
    try {
      const query = 'SELECT * FROM votes WHERE "createdBy" = $1 AND question_id = $2';
      const value = [createdBy, questionId];
      const result = await databaseConnection.query(query, value);
      return result;
    }
    catch (err) {
      console.log(err)
      return err;
    }
  }

  static async updateVotes(upvote, downvote) {
    try {
      const query = 'UPDATE votes SET upvotes = $1, downvotes = $2 WHERE question_id = $3';
      const value = [upvote, downvote];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  static async insertUpvote(createdBy, questionId) {
    try {
      const query = 'INSERT INTO votes("createdBy", upvote, question_id) VALUES($1, $2, $3)';
      const value = [createdBy, 1, questionId];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }
}