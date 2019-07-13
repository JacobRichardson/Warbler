/** 
 * Message handlers.
 */

//Imports.
const db = require('../models');

/** 
 * Create message function to create a message.
 */
exports.createMessage = async function (req, res, next) {

    try {

        //Create the new message with the text and the user's id.
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });

        //Find the user by their id.
        let user = await db.User.findById(req.params.id);

        //Push the message id into their messages array.
        user.messages.push(message.id);

        //Save the user.
        await user.save();

        //Find the message by it's _id and attach the user's information to the message.
        let foundMessage = await db.Message.findById(message._id).populate("user", {
            username: true,
            profileImageUrl: true
        });

        //Return the found message.
        return res.status(200).json(foundMessage);

    } catch (e) {

        //Return next with the error.
        return next(e);
    }

};

/** 
 * Get message function to get a message.
 */
exports.getMessage = async function (req, res, next) {};

/** 
 * Delete message function to delete a message.
 */
exports.deleteMessage = async function (req, res, next) {};