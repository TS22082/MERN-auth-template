const express = require("express");
const db = require("../models");
const passport = require("../config/passport");
const router = express.Router();

router.get("/api", (req, res) => {
  res.send({ msg: "success" });
});

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({ email: req.user.email, id: req.user.id });
});

router.post("/api/signup", (req, res) => {
  db.User.create({ email: req.body.email, password: req.body.password })
    .then((result) => {
      res.send(result);
    })
    .catch(() => res.send("error creating user"));
});

router.get("/logout", (req, res) => {
  req.session.destroy();
});

router.get("/api/user_data", (req, res) => {
  !req.user
    ? res.status(500).json({ msg: "No user logged in!" })
    : res.json({
        email: req.user.email,
        id: req.user.id,
      });
});

module.exports = router;
