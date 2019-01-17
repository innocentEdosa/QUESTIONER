import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


let dbconnectionString;
if (process.env.NODE_ENV === 'test') {
  dbconnectionString = process.env.DATABASE_TEST;
} else {
  dbconnectionString = process.env.DATABASE_URL;
}

const databaseConnection = new Pool({
  connectionString: dbconnectionString,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 2000,
  max: 5,
  min: 4,
});

export default databaseConnection;
