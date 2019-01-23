import { validationResult } from 'express-validator/check';
import Question from '../models/questions';
import Meetup from '../models/meetup';
import util from '../helper/util';
import databaseConnection from '../models/dbConfig';
import Votes from '../models/vote';


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
      let query = 'SELECT * FROM meetups WHERE id = $1';
      let value = [meetup];
      const response = await databaseConnection.query(query, value);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(404).json({ error: 'Meetup does not exist' });
      }
      query = 'INSERT INTO questions("createdBy", title, meetup, body) VALUES($1, $2, $3, $4) RETURNING *';
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

  static async upvote(req, res) {
    try {
      const { questionId } = req.params;
      let response = await Question.findbyId(questionId);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(404).json({ error: 'Question does not exist' });
      }
      const questionupvotes = response.rows[0].upvotes += 1;
      const questionvotes = response.rows[0].votes += 1;
      let questiondownvote = response.rows[0].downvotes;
      const result = await Votes.getvotes(req.user_id, questionId);
      if (result.rows[0]) {
        let upvote = result.rows[0].upvote;
        let downvote = result.rows[0].downvotes;
        if (upvote > 0) {
          return res.status(409).json({ status: 409, error: 'Sorry. You can only upvote once' });
        }
        if (downvote > 0) {
          downvote -= 1;
          questiondownvote -= 1;
        }
        const update = await Votes.updateVotes(upvote, downvote);
      } else {
        response = await Votes.insertUpvote(req.user_id, questionId);
        if (!response) {
          return res.status(500).json({ error: 'Server error!!! Try again later' });
        }
      }
      response = await Question.updatevotes(questionupvotes, questionvotes, questiondownvote, questionId);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(500).json({ error: 'Server error!!! Try again later' });
      }
      return res.status(200).json({ status: 200, data: [response.rows[0]] });

    }
    catch (err) {
      console.log(err, 'this is from the question upvote');
      return res.status(500).json({ error: 'Server error!!! Try again later' });
    }
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
