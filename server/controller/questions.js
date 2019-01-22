import { validationResult } from 'express-validator/check';
import Question from '../models/questions';
import Meetup from '../models/meetup';
import util from '../helper/util';
import databaseConnection from '../models/dbConfig';


/**
 * create a question controller class
 */
export default class questionController {
  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   */
  static async createQuestion(req, res) {
    try {
      const {
        meetup, title, body,
      } = req.body;
      const error = await validationResult(req);
      const errormsg = await util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      let query = 'SELECT * FROM meetups WHERE meetup_id = $1';
      let value = [meetup];
      const response = await databaseConnection.query(query, value);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(404).json({ error: 'Meetup does not exist' });
      }
      query = 'INSERT INTO questions(createdby, title, meetup, body) VALUES($1, $2, $3, $4) RETURNING *';
      value = [req.user_id, title, meetup, body]
      const result = await databaseConnection.query(query, value);
      if (!result.rows[0] || result.rows[0] === undefined) {
        return res.status(500).json({ error: 'Server error!!! Try again later' });
      }
      return res.status(201).json({ data: result.rows[0] });
    }
    catch (err) {
      console.log(err, 'this is from the question controller');
      return res.status(500).json({ error: 'Server error!!! Try again later' });
    }
  }

  static upvote(req, res) {
    const { questionId } = req.params;
    const upvote = Question.upvote(questionId);
    if (upvote < 0) {
      return res.status(404).json({ status: 404, error: 'This question does not exist' });
    }
    return res.status(200).json({ status: 200, data: upvote });
  }

  static downvote(req, res) {
    const { questionId } = req.params;
    const downvote = Question.downvote(questionId);
    if (downvote < 0) {
      return res.status(404).json({ status: 404, error: 'This question does not exist' });
    }
    return res.status(200).json({ status: 200, data: downvote });
  }
}
