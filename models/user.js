/**
 * This is the user model.
 */

//Imports.
const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');

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

/** 
 * This is a pre save hook for the user model.
 * It uses bcrypt to hash the user's password.
 */
userSchema.pre("save", async function (next) {

    try {

        //If the password has not been modified.
        if (!this.isModified("password")) {

            //return next.
            return next();
        }

        //Use bcrypt to hash the user's password.
        let hashedPassword = await bcrpyt.hash(this.password, 10);

        //Replace the user's password with the hashed password.
        this.password = hashedPassword;

        //Return next.
        return next();

    } catch (err) {

        //Return next with the error.
        return next(err);
    }
});

/** 
 * Instance method for the user model.
 * This method determines if the the password is correct.
 */
userSchema.method.comparePassword = async function (candidatePassword, next) {
    try {

        //Use bcrypt to see if the the password is correct.
        let isMatch = await bcrpyt.compare(candidatePassword, this.password);

        //Return wether of not the password is a match.
        return isMatch

    } catch (err) {


        //Return next with the error.
        return next(err);
    }

}

//Create the model using the schema.
const User = mongoose.model('User', userSchema);

//Export the module.
module.exports = User;