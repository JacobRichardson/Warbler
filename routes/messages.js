/** 
 * Message routes. All routes prefixed with /api/users/:id/messages.
 */

//Imports.
const express = require('express');
const {
    createMessage,
    getMessage,
    deleteMessage
} = require('../handlers/messages');

//Route with merge params.
const router = express.Router({
    mergeParams: true
});

//Post route for creating a message. (prefix '/api/users/:id/messages')
router.route("/").post(createMessage);

//Get route and delete route for messages. (prefix '/api/users/:id/messages)
router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

//Export the router.
module.exports = router;