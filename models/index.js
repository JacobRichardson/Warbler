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
}).then(() => {

    // Logging statement.
    console.log('Successfully connected to database.');

}).catch((err) => {

    // Log the error.
    console.log(`Connecting to the database failed. ${err.message}`)
});

//Export the user model.
module.exports.User = require('./user');

//Export the message model.
module.exports.Message = require('./message');