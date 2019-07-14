/**
 * Authentication middleware.
 */

//Imports.
require('dotenv');
const jwt = require('jsonwebtoken');

/*
 * Export function loginRequired.
 * Uses jwt to verify the user is logged in. 
 */
exports.loginRequired = function (req, res, next) {

    try {

        //Retrieve the token from the headers authorization, split on the space, and retrieve the token/key.
        const token = req.headers.authorization.split(" ")[1];

        //Use jwt to verify the token using the token and the key.
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {

            //If decoded is truthy.
            if (decoded) {

                //Return next because the user is authorized.
                return next();

            } else {

                //The token could not be decoded. Send back unauthorized and message.
                return next({
                    status: 401,
                    message: "Please log in first."
                });
            }
        });

    } catch (e) {

        //Error with token or it is missing. Send back unauthorized and message.
        return next({
            status: 401,
            message: "Please log in first."
        });
    }
}

/*
 * Export function ensureCorrectUser.
 * Use jwt to verify the user is the owner
 * of the message.
 */
exports.ensureCorrectUser = function (req, res, next) {

    try {

        //Retrieve the token from the headers authorization, split on the space, and retrieve the token/key.
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {

            //If the token could be decoded and the ids match.
            if (decoded && decoded.id === req.params.id) {

                //Return next because this user is the correct user.
                return next();
            } else {

                //There was an authorization issue so return 401 and a message.
                return next({
                    status: 401,
                    message: "Unauthorized."
                });
            }
        });

    } catch (e) {

        //There was an error so return 401 and a message.
        return next({
            status: 401,
            message: "Unauthorized."
        });
    }
}