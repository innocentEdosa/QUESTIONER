import { validationResult } from 'express-validator/check';
import Rsvp from '../models/rsvp';
import Meetup from '../models/meetup';
import util from '../helper/util';

/**
 * create a question controller class
 */
export default class rsvpController {
  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   */
  static createRsvp(req, res) { /** handles the creation of new rsvp */
    const {
      meetup, user, response,
    } = req.body;
    /** Check of meetup exit before creating rsvp */
    const found = Meetup.findMeetup(meetup);
    if (found < 0) {
      return res.status(404).json({ status: 404, error: 'The requested meetup does not exist! Try with an appropriate meetupId' });
    }
    const error = validationResult(req);
    util.errorCheck(error, res);
    const rsvp = new Rsvp();
    rsvp.create(meetup, user, response);
    return res.status(201).json({ status: 201, data: rsvp });
  }
}
