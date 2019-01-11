import Meetup from '../models/meetup';

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
      location, images, topic, happeningOn, tags, description, createdBy,
    } = req.body;
    const meetup = new Meetup();
    meetup.create(location, images, topic, happeningOn, tags, description, createdBy);
    return res.status(201).json({ status: 201, data: meetup });
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
