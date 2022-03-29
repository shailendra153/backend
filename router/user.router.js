const userController = require('../controller/user.controller');
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

router.post("/signin", userController.signin);
router.post("/signup", userController.signUp);
router.get("/user-list", userController.userList);
module.exports = router;