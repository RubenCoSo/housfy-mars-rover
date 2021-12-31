const express = require("express");
const router = express.Router();

const {
  postNewUser,
  checkUserLogin,
  getVerify,
} = require("../controllers/auth.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/signup", postNewUser);
router.post("/login", checkUserLogin);
router.get("/verify", isAuthenticated, getVerify);

module.exports = router;
