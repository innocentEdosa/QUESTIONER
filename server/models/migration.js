
import { config } from 'dotenv';

import databaseConnection from './dbConfig';

import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';

dotenv.config();

config();

databaseConnection.on('connect', () => {
  console.log('connected to the db');
});


const databaseTables = [
  `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(355) DEFAULT NULL,
    lastname VARCHAR(355) DEFAULT NULL,
    othername VARCHAR(355) DEFAULT NULL,
    email VARCHAR(355) UNIQUE NOT NULL,
    "phoneNumber" VARCHAR(13) DEFAULT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    registered TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updateOn" TIMESTAMP DEFAULT NOW(),
    "lastLogin" TIMESTAMP DEFAULT NOW(),
    "isAdmin" VARCHAR(50) DEFAULT 'false' NOT NULL
  );`,
  `DROP TABLE IF EXISTS meetups CASCADE;
    CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    "createdOn" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    topic VARCHAR (355) NOT NULL,
    location VARCHAR (355) NOT NULL,
    description VARCHAR (355) NOT NULL,
    "happeningOn" VARCHAR (355) NOT NULL,
    images VARCHAR (355),
    "createdBy" integer NOT NULL,
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


const hashPwd = bcrypt.hashSync(process.env.APASSWORD, 3);

const Admin = {
  firstname: 'innocent',
  lastname: 'ilegbinijie',
  username: 'adminuser',
  othername: 'edosa',
  email: 'ilegbinijieinnocent@gmail.com',
  password: hashPwd,
  phoneNumber: '070754240848',
  isadmin: 'TRUE',
};


const query =   'INSERT INTO users(firstname, lastname, othername, email, "phoneNumber", username, password, "isAdmin") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
const value = [Admin.firstname, Admin.lastname, Admin.othername, Admin.email, Admin.phoneNumber, Admin.username, Admin.password, Admin.isadmin ];

(async () => {
  try {
    await databaseConnection.query(databaseTables[0]);
    await databaseConnection.query(databaseTables[1]);
    await databaseConnection.query(databaseTables[2]);
    await databaseConnection.query(databaseTables[3]);
    await databaseConnection.query(databaseTables[4]);
    await databaseConnection.query(databaseTables[5]);
    await databaseConnection.query(query, value);
  }
  catch (err) {
    console.log(err);
  }
})()
