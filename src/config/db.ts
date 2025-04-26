import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
