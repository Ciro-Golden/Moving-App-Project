const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "Please check your Entry, no name specified"]
    },
    email: {
        type: String,
        required: [true, "Please check your Entry, no name specified"]
    },
    password_digest: {
        type: String,
        required: [true, "Please check your Entry, no name specified"]
    },
});

// Export the Model

module.exports = mongoose.model("User", UserSchema);