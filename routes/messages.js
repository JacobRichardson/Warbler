/** 
 * Message routes. All routes prefixed with /api/users/:id/messages.
 */

//Imports.
const express = require('express');
const {
    createMessage
} = require('../handlers/messages');

//Route with merge params.
const router = express.Router({
    mergeParams: true
});

//Post route for creating a message. (prefix '/api/users/:id/messages')
router.route("/").post(createMessage);

//Export the router.
module.exports = router;