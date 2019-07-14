/** 
 * Back-end REST server.
 */

//Environment variables.
require('dotenv').config();

//Imports.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const {
    loginRequired,
    ensureCorrectUser
} = require("./middleware/auth");

//Port Number.
const PORT = 8080;

//Body parser.
app.use(bodyParser.json());

//Auth routes.
app.use("/api/auth", authRoutes);

//Message routes.
app.use(
    "/api/users/:id/messages",
    loginRequired,
    ensureCorrectUser,
    messagesRoutes
);

app.get('/api/messages', loginRequired, async function (req, res, next) {

    try {

        //Find all messages. Sort by created at, and populate username and profile image.
        let messages = await db.Message
            .find()
            .sort({
                createdAt: "desc"
            })
            .populate("user", {
                username: true,
                profileImageUrl: true
            });

        //Return the messages.
        return res.status(200).json(messages);

    } catch (e) {

        //Return next with the error.
        return next(e);
    }
})

//Error function.
app.use(function (req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

//Error handler.
app.use(errorHandler);

//Listen on the port.
app.listen(PORT, function () {
    console.log(`Warbler server starting on port ${PORT}`);
});