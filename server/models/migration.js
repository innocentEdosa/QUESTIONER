
import { config } from 'dotenv';
import databaseConnection from './dbConfig';

config();

databaseConnection.on('connect', () => {
  console.log('connected to the db');
});

const databasetables = [
  `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(355) DEFAULT NULL,
    lastname VARCHAR(355) DEFAULT NULL,
    othername VARCHAR(355) DEFAULT NULL,
    email VARCHAR(355) UNIQUE NOT NULL,
    phoneNumber VARCHAR(13) DEFAULT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    "updateOn" TIMESTAMP DEFAULT NULL,
    "lastLogin" TIMESTAMP DEFAULT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE NOT NULL
  );`,
  `DROP TABLE IF EXISTS meetups CASCADE;
    CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    topic VARCHAR (355) NOT NULL,
    location VARCHAR (355) NOT NULL,
    description VARCHAR (355) NOT NULL,
    "happeningOn" VARCHAR (355) NOT NULL,
    images VARCHAR (355),
    createdby integer NOT NULL,
    tags VARCHAR (355)[]
  );`,
  `DROP TABLE IF EXISTS rsvps CASCADE;
  CREATE TABLE rsvps (
  id SERIAL PRIMARY KEY,
  meetup integer NOT NULL,
  userId integer NOT NULL,
  response VARCHAR (355) NOT NULL,
  FOREIGN KEY (meetup) REFERENCES meetups(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );`,
  `DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions(
  id SERIAL PRIMARY KEY,
  "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
  "createdBy" integer,
  meetup integer DEFAULT 0,
  title VARCHAR(100) NOT NULL,
  body VARCHAR(355) NOT NULL,
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  votes integer DEFAULT 0,
  FOREIGN KEY (meetup) REFERENCES meetups(id) ON DELETE CASCADE,
  FOREIGN KEY ("createdBy") REFERENCES users(id) ON DELETE CASCADE
);`,
  `DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes(
  id SERIAL PRIMARY KEY,
  question_id integer NOT NULL,
  "createdBy" integer,
  upvote integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  FOREIGN KEY ("createdBy") REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);`,
  `DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  question integer NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "createdBy" integer NOT NULL,
  body VARCHAR(355) NOT NULL,
  comment VARCHAR(355) NOT NULL,
  FOREIGN KEY (question) REFERENCES questions(id) ON DELETE CASCADE
);`,
];

(async () => {
  try {
    // await databasetables.forEach(query => databaseConnection.query(query, error => console.log(error)));
    for (let i = 0; i < databasetables.length; i += 1) {
      const response = await databaseConnection.query(databasetables[i]);
    }
  }
  catch (err) {
    console.log(err);
  }
})()