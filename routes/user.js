/** 
 * User routes All routes prefixed with /api/users/.
 */

// Imports.
const express = require('express');
const {
    getUser,
    updateUser
} = require('../handlers/user');

// Route with merge params.
const router = express.Router({
    mergeParams: true
});

// General followers route (prefix '/api/users/').
router.route('/:id')

    // Get route for a specific user.
    .get(getUser)
    .patch(updateUser);

//Export the router.
module.exports = router;