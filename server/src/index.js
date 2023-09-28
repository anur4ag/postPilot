const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const cors = require("cors");
const session = require("express-session");
// dotenv.config();

const app = express();
app.use(cors());
const port = 3000;

app.use(
  session({
    secret: "hczEozyfKrPXyDGXKtzGLnkcj", // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define API routes
app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
