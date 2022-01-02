const router = require("express").Router();
const authRoutes = require("./auth");
const gameRoutes = require("./game")
const userRoutes = require("./user")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
router.use("/user", userRoutes)


module.exports = router;
