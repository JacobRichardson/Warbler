/** 
 * Authentication handlers.
 */

//Imports
const db = require('../models');
const jwt = require('jsonwebtoken');

/** 
 * Sign in function to log a user in.
 */
exports.signIn = function () {

}

/** 
 * Sign up function to create a user.
 */
exports.signUp = async function (req, res, next) {

    try {

        //Use the db and req.body to create the user.
        let user = await db.User.create(req.body);

        //Retrieve values from the user.
        let {
            id,
            username,
            profileImageUrl
        } = user;

        //Create a json web token using those values.
        let token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
        );

        //Return the new user with their token.
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });

    } catch (err) {

        //If a validation fails.
        if (err.code === 11000) {

            //Return a nice message.
            err.message = "Sorry, that username and/or email is taken.";
        }

        //Return the error.
        return next({
            status: 400,
            message: err.message
        });
    }
}