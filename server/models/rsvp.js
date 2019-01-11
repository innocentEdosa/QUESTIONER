/**
 * @module db
 * @module Meetup
 */
import db from './db';
import Meetup from './meetup';

/**
 * create a rsvp model
 */
export default class Rsvp {
  constructor() {
    this.id = db.rsvp.length + 1;
  }

  create(meetupId, user, response) {
    this.meetup = Number(meetupId);
    this.user = Number(user);
    this.topic = Meetup.getTopic(this.meetup);
    this.response = response;
    db.rsvp.push(this);
  }
}
