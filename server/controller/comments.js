import { validationResult } from 'express-validator/check';
import Comment from '../models/comments';
import Question from '../models/questions';
import util from '../helper/util';

/**
 * create a question controller class
 */
export default class commentController {
  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   */
  static async createComment(req, res) { /** handles the creation of new rsvp */
    try {
      const {
        question, comment
      } = req.body;
      const error = validationResult(req);
      const errormsg = await util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      let result = await Question.findbyId(question);
      if (!result.rows[0]) {
        return res.status(404).json({ error: 'Question not found' });
      }
      const questionTitle = result.rows[0].title;
      const questionBody = result.rows[0].body;
      result = await Comment.createComment(question, questionTitle, questionBody, comment, req.user_id);
      if (result.rows[0]) {
        return res.status(201).json({ data: [result.rows[0]] });
      }
    }
    catch (err) {
      res.status(500).json({ error: "Server error!!!, Try again later" });
    }
  }

  static async getComments(req, res) {
    try {
      const { questionid } = req.params;
      const result = await Comment.getComments(questionid);
      if (!result.rows) {
        return res.status(404).json({ error: 'Comments not found' });
      }
      return res.status(200).json({status: 200, data: result.rows})
    } catch (error) {
      console.log(error);
    }
  }
}
