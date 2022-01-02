const express = require("express");
const router = express.Router();

const {userInfo} = require('../controllers/user.controllers')


router.get("/info/:id" , userInfo);

module.exports = router;