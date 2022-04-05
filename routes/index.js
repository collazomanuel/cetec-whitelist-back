import {
  get_whitelist,
  get_user,
  add_user,
  put_user,
  delete_user
} from '../controllers/whitelist_controller.js'

var express = require('express');
var router = express.Router();

router.get('/', get_whitelist);
router.get('/', get_user);
app.post('/', add_user);
app.put('/user/:id', put_user);
app.delete('/user/:id', delete_user);

module.exports = router;
