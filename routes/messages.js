/** 
 * Message routes. All routes prefixed with /api/users/:id/messages.
 */

//Imports.
const express = require('express');
const {
    createMessage,
    getMessage,
    getAllMessages,
    deleteMessage,
    updateMessage
} = require('../handlers/messages');

//Route with merge params.
const router = express.Router({
    mergeParams: true
});

//Post route for creating a message. (prefix '/api/users/:id/messages')
router.route("/")

    // Get route for retrieving all messages of a user.
    .get(getAllMessages)

    // Post route to create a message.
    .post(createMessage);

//Get route and delete route for messages. (prefix '/api/users/:id/messages)
router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage)
    .patch(updateMessage);

//Export the router.
module.exports = router;