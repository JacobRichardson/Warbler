/**
 * This is the user model.
 */

//Imports.
const mongoose = require('mongoose');
const bcrpyt = require('bcrpyt');

//User schema.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    profileImageUrl: {
        type: String
    }
});

//Create the model using the schema.
const User = mongoose.model('User', userSchema);

//Export the module.
module.exports = User;