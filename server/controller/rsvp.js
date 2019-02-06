import { validationResult } from 'express-validator/check';
import Rsvp from '../models/rsvp';
import Meetup from '../models/meetup';
import util from '../helper/util';

export default class rsvpController {
  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   */
  static async createRsvp(req, res) { /** handles the creation of new rsvp */
    try {
      const {
        meetup, user, response,
      } = req.body;
      const error = validationResult(req);
      const errormsg = await util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      let result = await Meetup.findbyId(meetup);
      if (!result.rows[0]) {
        return res.status(404).json({ error: 'Meetup not found' });
      }
      result = await Rsvp.check(meetup, user);
      if (result.rows[0]) {
        result = await Rsvp.update(meetup, user, response, result.rows[0].id);
        if (result.rows[0]) {
          return res.status(200).json({ data: [result.rows[0]], msg: 'Rsvp updated' });
        }
      }
      result = await Rsvp.create(meetup, user, response);
      if (result.rows[0]) {
        return res.status(201).json({ data: [result.rows[0]] })
      }
      console.log(result);
    }
    catch (err) {
      console.log(err);
    }
  }

  static async findbyUser(req, res) {
    try {
      const { userid } = req.params;
      const response = await Rsvp.findbyUser(userid);
      if (!response.rows[0] || response.rows[0] === undefined) {
        return res.status(404).json({ error: 'No Rsvp for this user' });
      }
      return res.status(200).json({ status: 200, data: response.rows, number: response.rowCount });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error!!! Try again later' });
    }
  }
}
