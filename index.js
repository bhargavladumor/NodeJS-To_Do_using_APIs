const express = require("express");
const app = express();
const port = 8080;
const db = require("./config/mongoose");

const passport = require("passport");
const passport_jwt  = require("./config/passport_jwt");
const session = require("express-session");

app.use(express.urlencoded());

app.use(session({
    name : "Bhargav",
    secret : "admin",
    resave : false,
    saveUninitialized : false,
    cookie : { maxAge : 1000*60*10 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin",require("./routes/admin"));
app.use("/user",require("./routes/user"));

app.listen(port,(err) => {
    err ? console.log(err) : console.log(`App is running on port ${port}`);
})