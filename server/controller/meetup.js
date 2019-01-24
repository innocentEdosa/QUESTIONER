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
  static async createMeetup(req, res) {
    try {
      const {
        location, images, topic, happeningOn, tags, description,
      } = req.body;
      const error = validationResult(req);
      const errormsg = await util.errorCheck(error, res);
      if (errormsg) {
        return false;
      }
      if (!req.isadmin) {
        return res.status(401).json({ error: 'NOT AUTHORISED' });
      }
      const response = await Meetup.insertMeetup(location, images, topic, happeningOn, tags, description, req.user_id);
      if (response.rows[0]) {
        return res.status(201).json({ data: response.rows[0] });
      }
    }
    catch (err) {
      return res.status(500).json({ status: 500, error: 'Server error!!! Try again later' });
    }
  }

  /**
   * @param {object} req - the request object sent from router
   * @param {object} res - response object
   */
  static getMeetups(req, res) {
    const query = 'SELECT * FROM "public"."meetups" LIMIT 100';
    databaseConnection.query(query)
      .then((response) => {
        if (response.rows) {
          return res.status(200).json({ data: response.rows });
        }
        return res.status(404).json({ error: 'meetups not found' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Server error!!! Try again later' });
      });
  }

  static getMeetup(req, res) {
    const { meetupId } = req.params;
    // check of meetup exists
    const query = 'SELECT * FROM "public"."meetups" WHERE id = $1';
    const value = [meetupId];
    databaseConnection.query(query, value)
      .then((response) => {
        if (response.rows[0]) {
          return res.status(200).json({ data: response.rows[0] });
        }
        return res.status(404).json({ error: 'meetup not found' });

      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Server error!!! Try again later' });
      });
  }
}
