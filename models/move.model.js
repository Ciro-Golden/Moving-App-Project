const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MoveSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "Please check your Entry, no name specified"]
    },
    street: {
        type: String,
        required: [true, "Please check your Entry, no name specified"]
    },
    city: {
        type: String,
        required: [true, "Please check your Entry, no name specified"]
    },
    province: {
        type: String,
        required: [true, "Please check your Entry, no name specified"]
    },
    rooms: {
        type: Number,
        min: 1,
        max: 10
    },
    movers: {
        type: Number,
        min: 1,
        max: 3
    },
    comments: String
});


// Export the Model

module.exports = mongoose.model("Move", MoveSchema);