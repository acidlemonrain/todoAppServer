const router = require('express').Router();
//import child routes
const todo = require('./controller/todo');
const file = require('./controller/file');
const dir = require('./controller/dir');
const user = require('./controller/user');
const todolist = require('./controller/todolist');
const status = require('./controller/status');
const tree = require('./controller/tree');
router.use('/file', file);
router.use('/todo', todo);
router.use('/user', user);
router.use('/status', status);
router.use('/tree', tree);
router.use('/dir', dir);
router.use('/todolist', todolist);
module.exports = router;
