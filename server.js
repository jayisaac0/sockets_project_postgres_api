const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('express-async-errors');

const registration = require('./routes/UserRegistration');
const auth = require('./routes/Auth');
const profile = require('./routes/UserProfile');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use('/api/registration', registration);
app.use('/api/auth', auth);
app.use('/api/profile', profile);


const port = process.env.SERVER_PORT;
const server = app.listen(`${port}`);
module.exports = server;