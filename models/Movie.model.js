//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: false},
    genre: {type: String, required: false}, 
    plot: {type: String, required: false},
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}],
});

const Movies = mongoose.model('Movie', movieSchema);

module.exports = Movies;