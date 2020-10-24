const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controller/userControl");

//GET USERS
router.route('/').get(getUsers);

//POST USER
router.route('/').post(addUser);

//EXPORT ROUTER
module.exports = router;
