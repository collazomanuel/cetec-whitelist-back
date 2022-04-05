var express = require('express');
var router = express.Router();
var {
  get_whitelist,
  get_user,
  add_user,
  put_user,
  delete_user
} = require('../controllers/whitelist_controller.js');


router.get('/whitelist', get_whitelist);
router.get('/user', get_user);
router.post('/user', add_user);
router.put('/user/:id', put_user);
router.delete('/user/:id', delete_user);

module.exports = router;
