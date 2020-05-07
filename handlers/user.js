/** 
 * User handlers.
 */

// Imports.
const db = require('../models');

/** 
 * Retrieves a users.
 * GET - /api/users/:id
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next function to be called.
 * @returns {Object} The user record if one exists.
 */
exports.getUser = async function (req, res, next) {

    try {

        // Find the user by it's _id.
        const user = await db.User.findById({
            _id: req.params.id,
        });

        // Remove values from user record.
        user.password = undefined;
        user.email = undefined;

        // Return the user.
        return res.status(200).json(user);

    } catch (e) {

        // Return next with the error.
        return next(e);
    }
};