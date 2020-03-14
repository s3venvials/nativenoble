const express = require("express");
let app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;
let HOSTNAME = "localhost";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let mongooseOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const cookieParser = require("cookie-parser");
const session = require("express-session");
const keys = require("./config/keys");

mongoose.connect(keys.mongo.dbURI, mongooseOptions, (error) => {
    if (error) {
        console.log(error)
        console.log("DB not connected!");
    } else {
        console.log("DB connected!");
    }
});

app.use(bodyParser.json());
app.use(cookieParser('your secret here'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}));

//Initialize Passport.js
require("./modules/passport.config")(app);

//Routes
require("./routes/test.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, HOSTNAME, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server successfully started at http://${HOSTNAME}:${PORT}`);
});