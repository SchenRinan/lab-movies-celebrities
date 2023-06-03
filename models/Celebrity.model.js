//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    name: {type: String, required: true},
    occupation: {type: String, required: true}, 
    catchPhrase: {type: String, required: true},
});

const Celebrities = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrities;