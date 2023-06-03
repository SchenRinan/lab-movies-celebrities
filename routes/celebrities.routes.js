// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";
const Celebrities = require('../models/Celebrity.model');

// all your routes here
router.get("/celebrities", (req, res, next) => {
    mongoose.connect(MONGO_URI)
        .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
        .then(()=>Celebrities.find())
        .then(content => res.render("celebrities/celebrities", {content}))
        .then(()=> mongoose.connection.close())
        .catch((err) => {
            console.error("Error connecting to mongo: ", err);
        });
});

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
    //connect to the database and create using parts of req then redirect to celebrities page
    //if there's an error I'm guessing put a red error but basically do something
    // .then(res.redirect('/celebrities'))
    mongoose.connect(MONGO_URI)
        // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
        .then(Celebrities.create(req.body))
        .then(res.redirect('/celebrities'))
        // .then(()=> mongoose.connection.close()) //somehow it doesn't want to close
        .catch((err) => {
            console.error("Error connecting to mongo: ", err);
        });
});
module.exports = router;