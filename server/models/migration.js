
import { config } from 'dotenv';
import databaseConnection from './dbConfig';

config();

databaseConnection.on('connect', () => {
  console.log('connected to the db');
});

/**
 *  This function creates Meetup table in the database
 */
const databasetables = [
  `DROP TABLE IF EXISTS users;
    CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(355) DEFAULT NULL,
    lastname VARCHAR(355) DEFAULT NULL,
    othername VARCHAR(355) DEFAULT NULL,
    email VARCHAR(355) UNIQUE NOT NULL,
    phoneNumber VARCHAR(13) DEFAULT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    updateOn TIMESTAMP DEFAULT NULL,
    lastLogin TIMESTAMP DEFAULT NULL,
    isadmin BOOLEAN DEFAULT FALSE NOT NULL
  );`,
  `DROP TABLE IF EXISTS meetups;
    CREATE TABLE meetups (
    meetup_id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    topic VARCHAR (355) NOT NULL,
    location VARCHAR (355) NOT NULL,
    description VARCHAR (355) NOT NULL,
    happeningOn VARCHAR (355) NOT NULL,
    images VARCHAR (355),
    createdby integer NOT NULL,
    tags VARCHAR (355)[]
  );`,
  `DROP TABLE IF EXISTS rsvps;
  CREATE TABLE rsvps (
  rsvp_id SERIAL PRIMARY KEY,
  meetup integer NOT NULL,
  user_id integer NOT NULL,
  response VARCHAR (355) NOT NULL
  );`,
  `DROP TABLE IF EXISTS questions;
    CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    createdby integer,
    meetup integer,
    title VARCHAR (100) UNIQUE NOT NULL,
    body VARCHAR (355) NOT NULL,
    upvotes integer DEFAULT 0,
    downvotes integer DEFAULT 0,
    votes integer DEFAULT 0
  );`,
];

databasetables.forEach(query => databaseConnection.query(query, error => console.log(error)));
