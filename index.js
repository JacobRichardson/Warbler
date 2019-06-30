/** 
 * Back-end REST server.
 */

//Environment variables.
require('dotenv').config();

//Imports.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');

//Port Number.
const PORT = 8080;

//Body parser.
app.use(bodyParser.json());

//Auth routes.
app.use("/api/auth", authRoutes);

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