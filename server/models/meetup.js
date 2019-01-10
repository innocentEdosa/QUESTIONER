import db from './db';

// create a class to handle the meetup array
export default class Meetup {
  constructor() {
    this.id = db.meetup.length + 1;
    this.createdOn = new Date();
    this.image = '';
    this.tags = [];
    this.noOfQuestions = 0;
  }

  create(location, images, topic, happeningOn, tags, description, createdBy) {
    this.location = location;
    if (images) {
      this.images = images;
    }
    this.topic = topic;
    this.happeningOn = happeningOn;
    if (tags) {
      this.tags = this.tags.concat(tags);
    }
    this.description = description;
    this.createdBy = createdBy;
    db.meetup.push(this);
  }

  static getAll() {
    return db.meetup;
  }

  static findMeetup(meetupId) {
    const Id = Number(meetupId);
    const found = [];
    for (let i = 0; i < db.meetup.length; i += 1) {
      if (db.meetup[i].id === Id) {
        found.push(db.meetup[i]);
        return found;
      }
    }
    return -1;
  }

  static getUpcomingMeetup() {
    const upcoming = [];
    for (let i = 0; i < db.meetup.length; i += 1) {
      if (db.meetup[i].happeningOn > new Date()) {
        upcoming.push(db.meetup[i]);
      }
    }
    return upcoming;
  }

  static getTopic(meetupId) {
    for (let i = 0; i < db.meetup.length; i += 1) {
      if (db.meetup[i].id === meetupId) {
        return db.meetup[i].topic;
      }
    }
    return -1;
  }
}
