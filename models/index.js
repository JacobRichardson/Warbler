/** 
 * Index for models.
 */

//Imports.
const mongoose = require('mongoose');

//Set debug to true.
mongoose.set("debug", true);

//Make Mongo use promises.
mongoose.Promise = Promise;

// Use the environment's Mongo URI or the local host to connect to the database.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warbler', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Export the user model.
module.exports.User = require('./user');

//Export the message model.
module.exports.Message = require('./message');