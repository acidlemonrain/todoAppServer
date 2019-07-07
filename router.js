const router = require('express').Router();
//import child routes
const todo = require('./controller/todo');
const con = require('./database');

router.use('/todo', todo);
module.exports = router;
