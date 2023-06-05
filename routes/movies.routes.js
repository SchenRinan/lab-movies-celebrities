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
    // .then(()=> mongoose.connection.close())
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
    .then(()=> Movies.findById(req.params.id).populate('cast'))
    .then(item => res.render("movies/movie-details", item))
    .then(()=> mongoose.connection.close())
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
  });
});

router.post("/movies/:id/delete", (req, res, next) => {
  mongoose.connect(MONGO_URI)
    .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
    .then(()=>
      Movies.findByIdAndRemove(req.params.id))
    .then(()=>res.redirect('/movies'))
    // .then(()=> mongoose.connection.close()) //somehow it doesn't want to close
    // .then(res.redirect('/movies'))
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  let celeblist;
  
  mongoose.connect(MONGO_URI)
    // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
    .then(()=> Celebrities.find())
    .then((list)=> celeblist = list)
    .then(()=> Movies.findById(req.params.id).populate('cast'))
    .then(item => {
      console.log(item)
      res.render("movies/edit-movie", {item: item, list: celeblist})})
    .then(()=> mongoose.connection.close())
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
  });
});

router.post("/movies/:id/edit", (req, res, next) => {
  mongoose.connect(MONGO_URI)
    // .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);})
    .then(()=> Movies.findByIdAndUpdate(req.params.id, req.body))
    .then(() => {res.redirect("/movies")})
    .then(()=> mongoose.connection.close())
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
  });
});

module.exports = router;