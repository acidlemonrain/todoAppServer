const router = require('express').Router();
//import child routes
const todo = require('./controller/todo');

const user = require('./controller/user');
const todolist = require('./controller/todolist');
const status = require('./controller/status');
router.use('/todo', todo);
router.use('/user', user);
router.use('/status', status);
router.use('/todolist', todolist);
module.exports = router;
