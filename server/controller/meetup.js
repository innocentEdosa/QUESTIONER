import { validationResult } from 'express-validator/check';

import databaseConnection from '../models/dbConfig';

import Meetup from '../models/meetup';

import util from '../helper/util';

/**
 * create a meetup controller class
 */
export default class meetupController {
  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   */
  static createMeetup(req, res) {
    const {
      location, images, topic, happeningOn, tags, description,
    } = req.body;
    const error = validationResult(req);
    util.errorCheck(error, res);
    if (!req.isadmin) {
      return res.status(401).json({ error: 'NOT AUTHORISED' });
    }
    const query = 'INSERT INTO meetups(location, images, topic, happeningOn, tags, description, createdBy) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const value = [location, images || 'imagurl', topic, happeningOn, tags || [], description, req.user_id];
    databaseConnection.query(query, value)
      .then((response) => {
        if (response.rows[0]) {
          return res.status(201).json({ data: response.rows[0] });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: 'Server error!!! Try again later' });
      });
  }

  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   */
  static getMeetups(req, res) {
    const meetup = Meetup.getAll();
    if (meetup.length === 0) {
      return res.status(404).json({ status: 404, data: [{ info: 'No meetup yet' }] });
    }
    return res.status(200).json({ status: 200, data: meetup });
  }

  static getMeetup(req, res) {
    const { meetupId } = req.params;
    // check of meetup exists
    const found = Meetup.findMeetup(meetupId);
    if (found < 0) {
      return res.status(404).json({ status: 404, error: 'The requested post does not exist! Try with an appropriate meetupId' });
    }
    return res.status(200).json({ status: 200, data: found });
  }

  static getUpcoming(req, res) {
    const upcoming = Meetup.getUpcomingMeetup();
    if (upcoming.length === 0) {
      return res.status(204).json({ status: 200, data: [{ info: 'No upcoming meetup' }] });
    }
    return res.status(200).json({ status: 200, data: upcoming });
  }
}
