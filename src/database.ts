import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DATABASE_URL);


const { Pool } = pg;
const db = new Pool({
    connectionString: process.env.DATABASE_URL
    
});

export default db;