const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const db = require("./models/");
const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 36 * 100000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
});
