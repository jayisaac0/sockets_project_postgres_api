const {Pool} = require('pg');

require('dotenv').config();

const database = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_NAME : process.env.DEV_DATABASE_NAME;

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database,
});

pool.connect()
    .then(() => console.log(`connected to ${database}`))
    .catch((error) => console.log(error));

module.exports = pool;