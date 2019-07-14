const express = require('express');
require('dotenv').config();
const bodyParse = require('body-parser');
const connection = require('./database');
const cors = require('cors');
const router = require('./router');
const app = express();
connection.connect();
app.use(cors());
app.use(bodyParse.json());
app.use(router);
app.listen(7000);
console.log(process.env.api);

console.log('run');
