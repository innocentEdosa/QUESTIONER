import { validationResult } from 'express-validator/check';
import Question from '../models/questions';
import Meetup from '../models/meetup';
import Util from '../helper/util';
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
      const errormsg = await Util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      const response = await Meetup.findbyId(meetup);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(404).json({ error: 'Meetup does not exist' });
      }
      const result = await Question.insertQuestion(req.user_id, title, meetup, body);
      if (!result.rows[0] || result.rows[0] === undefined) {
        return res.status(500).json({ error: 'Server error!!! Try again later' });
      }
      return res.status(201).json({ data: [ result.rows[0] ] });
    }
    catch (err) {
      return res.status(500).json({ error: 'Server error!!! Try again later' });
    }
  }

  static async upvote(req, res) {
    try {
      const { questionId } = req.params;
      if (!Util.checkId(questionId)) {
        return res.status(422).json({ error: 'Question id can only be a number ' });
      };
      let response = await Question.findbyId(questionId);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(404).json({ error: 'Question does not exist' });
      }
      const questionupvotes = response.rows[0].upvotes += 1;
      let questionvotes = response.rows[0].votes += 1; let questiondownvote = response.rows[0].downvotes;
      const result = await Votes.getvotes(req.user_id, questionId);
      if (result.rows[0]) {
        let upvote = result.rows[0].upvote;
        let downvote = result.rows[0].downvotes;
        if (upvote > 0) {
          return res.status(409).json({ error: 'Sorry. You can only upvote once' });
        }
        if (downvote > 0) { downvote = 0; questiondownvote -= 1; questionvotes -= 1;}
        upvote = 1;
        const update = await Votes.updateVotes(upvote, downvote, questionId);
      } else {
        response = await Votes.insertvote(req.user_id, questionId, 'upvote');
        if (!response) {
          return res.status(500).json({ error: 'Server error!!! Try again later' });
        }
      }
      response = await Question.updatevotes(questionupvotes, questionvotes, questiondownvote, questionId);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(500).json({ error: 'Server error!!! Try again later' });
      }
      return res.status(200).json({ data: [response.rows[0]] });

    }
    catch (err) {
      return res.status(500).json({ error: 'Server error!!! Try again later' });
    }
  }

  static async downvote(req, res) {
    try {
      const { questionId } = req.params;
      if (!Util.checkId(questionId)) {
        return res.status(422).json({ error: 'Question id can only be a number' });
      };
      let response = await Question.findbyId(questionId);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(404).json({ error: 'Question does not exist' });
      }
      let questionupvotes = response.rows[0].upvotes;
      let questionvotes = response.rows[0].votes += 1;
      let questiondownvote = response.rows[0].downvotes += 1;
      const result = await Votes.getvotes(req.user_id, questionId);
      if (result.rows[0]) {
        let upvote = result.rows[0].upvote;
        let downvote = result.rows[0].downvotes;
        if (downvote > 0) {
          return res.status(409).json({ error: 'Sorry. You can only downvote once' });
        }
        if (upvote > 0) {
          upvote = 0;
          questionupvotes -= 1;
          questionvotes -= 1;
        }
        downvote = 1;
        const update = await Votes.updateVotes(upvote, downvote, questionId);
      } else {
        response = await Votes.insertvote(req.user_id, questionId, 'downvotes');
        if (!response) {
          return res.status(500).json({ error: 'Server error!!! Try again later' });
        }
      }
      response = await Question.updatevotes(questionupvotes, questionvotes, questiondownvote, questionId);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(500).json({ error: 'Server error!!! Try again later' });
      }
      return res.status(200).json({ data: [response.rows[0]] });

    }
    catch (err) {
      return res.status(500).json({ error: 'Server error!!! Try again later' });
    }
  }

  static async findbyMeetupId(req, res) {
    try {
      console.log(req.params)
      const { meetupid } = req.params;
      console.log(meetupid);
      let response = await Question.findbyMeetup(meetupid);
      if (!response.rows[0] || response.rows[0] === undefined) {
        console.log(response);
        return res.status(404).json({ error: 'Question does not exist' });
      }
      console.log(response)
      return res.status(200).json({status: 200 , data: response.rows, number: response.rowCount});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: 'Server error!!! Try again later' });
    }

  }
}
