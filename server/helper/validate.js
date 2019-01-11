import { body } from 'express-validator/check';

export default class validator {
  static validateMeetup() {
    return [body('location', 'location cannot be undefined').trim().exists(),
      body('topic', 'Topic must be at least 3 characters long').trim().exists().isLength({ min: 3 }),
      body('tags', 'Tags should be sent as an array').trim().optional().isArray(),
      body('happeningOn', 'happeningOn must be defined').trim().exists(),
      body('description', 'description must be defined and more than 10 characters').trim().exists(),
      body('createdBy', 'creadteBy cannot be undefined').trim().exists(),
    ];
  }

  static validateQuestions() {
    return [body('createdBy', 'createdBy cannot be undefined').trim().exists(),
      body('title', 'Title must be at least 3 characters long').trim().exists().isLength({ min: 3 }),
      body('meetup', 'meetup cannot be undefined').trim().exists().isNumeric(),
      body('body', 'body cannot be undefined').trim().exists(),
    ];
  }

  static validateRsvp() {
    return [body('user', 'user cannot be undefined').trim().exists(),
      body('response', 'response must be at least 3 characters long').trim().exists().isLength({ min: 3 }),
      body('meetup', 'meetup cannot be undefined').trim().exists().isNumeric(),
    ];
  }
}
