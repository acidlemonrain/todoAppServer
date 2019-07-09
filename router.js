const router = require('express').Router();
//import child routes
const todo = require('./controller/todo');

const user = require('./controller/user');
const todolist = require('./controller/todolist');
router.use('/todo', todo);
router.use('/user', user);
router.use('/todolist', todolist);
module.exports = router;
