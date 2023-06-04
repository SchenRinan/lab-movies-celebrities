const Celebrities = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model");
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";
const router = require("express").Router();

// all your routes here
router.get("/movies", (req, res, next) => {
  mongoose.connect(MONGO_URI)
    // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
    .then(()=> Movies.find())
    .then(item => res.render('movies/movies', {item}))
    .then(()=> mongoose.connection.close())
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
});
});

router.get("/movies/create", (req, res, next) => {
  mongoose.connect(MONGO_URI)
    // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
    .then(()=> Celebrities.find())
    .then(item => res.render("movies/new-movie", {item}))
    .then(()=> mongoose.connection.close())
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
  });
});

router.post("/movies/create", (req, res, next) => {
  mongoose.connect(MONGO_URI)
    // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
    .then(()=> Movies.create(req.body))
    // .then(()=> mongoose.connection.close()) //somehow it doesn't want to close
    .then(res.redirect('/movies'))
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });
});

router.get("/movies/:id", (req, res, next) => {
  mongoose.connect(MONGO_URI)
    // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
    .then(()=> Movies.findById(req.params.id))
    .then(item => res.render("movies/movie-details", item))
    .then(()=> mongoose.connection.close())
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
  });
});

module.exports = router;