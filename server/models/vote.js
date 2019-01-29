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
      return err;
    }
  }

  static async updateVotes(upvote, downvote, questionId)  {
    try {
      const query = 'UPDATE votes SET upvote = $1, downvotes = $2 WHERE question_id = $3';
      const value = [upvote, downvote, questionId];
      const response = await databaseConnection.query(query, value);
    }
    catch (err) {
      return err;
    }
  }

  static async insertvote(createdBy, questionId, vote) {
    try {
      const query = 'INSERT INTO votes("createdBy", ' + vote + ', question_id) VALUES($1, $2, $3)';
      const value = [createdBy, 1, questionId];
      const response = await databaseConnection.query(query, value);
      return response;
    }
    catch (err) {
      return err;
    }
  }
}