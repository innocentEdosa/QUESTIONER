const db = [];
db.meetup = [{
  id: 3,
  createdOn: new Date(),
  location: 'aduwawa',
  images: 'this is the imgae url',
  topic: 'This is the best meetup ever ',
  happeningOn: new Date(2019, 2, 1),
  tags: ['business', 'entertianment'],
  description: 'this is a very short description of this very second meetup',
  noOfQuestions: 2,
}];

db.question = [{
  id: 1,
  createdOn: '2019-01-10T10:30:38.918Z',
  upvote: 0,
  downvote: 0,
  createdBy: 2,
  meetup: 3,
  title: 'the fouth question',
  body: 'this is the body',
},
];

db.rsvp = [];
export default db;
