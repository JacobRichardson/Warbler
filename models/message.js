/**
 * This is the message model.
 */

//Imports.
const mongoose = require('mongoose');
const User = require('./user');

//Message schema.
const messageScheme = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

/** 
 * This is a pre remove hook for the message model.
 * It finds the user that owns the message and removes
 * that message from the user
 */
messageScheme.pre('remove', async function (next) {

    try {

        //Find the user by the id. (This means the message record).
        let user = await User.findById(this.user);

        //Remove the message from the user.
        user.messages.remove(this.id);

        //Save the user record.
        await user.save();

        //Return next.
        return next();

    } catch (e) {

        //Return next with the error.
        return next(e);
    };
});

//Create the model using the schema.
const Message = mongoose.model('Message', messageScheme);

//Export the model..
module.exports = Message;