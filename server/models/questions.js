import db from './db';
import Meetup from './meetup';

export default class Question {
  constructor() {
    this.id = db.question.length + 1;
    this.createdOn = new Date();
    this.upvote = 0;
    this.downvote = 0;
  }

  create(createdBy, meetup, title, body) {
    this.createdBy = createdBy;
    this.meetup = meetup;
    this.title = title;
    this.body = body;
    db.question.push(this);
    Question.notifyMeetup(meetup);
  }

  static notifyMeetup(meetupId) {
    const meetup = Meetup.findMeetup(meetupId);
    meetup[0].noOfQuestions += 1;
  }

  static upvote(questionId) {
    const Id = Number(questionId);
    const found = [];
    for (let i = 0; i < db.question.length; i += 1) {
      if (db.question[i].id === Id) {
        db.question[i].upvote += 1;
        found.push(db.question[i]);
        return found;
      }
    }
    return -1;
  }

  static downvote(questionId) {
    const Id = Number(questionId);
    const found = [];
    for (let i = 0; i < db.question.length; i += 1) {
      if (db.question[i].id === Id) {
        db.question[i].downvote += 1;
        found.push(db.question[i]);
        return found;
      }
    }
    return -1;
  }
}
