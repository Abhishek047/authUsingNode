const express = require("express");
const router = express.Router();
const { authenticateUser, getUser } = require('../controller/authControl');

//LOGIN USER
router.route('/').post(authenticateUser);

router.route('/user').get(getUser);

//EXPORT ROUTER
module.exports = router;
