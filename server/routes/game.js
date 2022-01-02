const express = require("express");
const router = express.Router();

const {saveGame} = require('../controllers/game.controllers')


router.post("/save" , saveGame);

module.exports = router;
