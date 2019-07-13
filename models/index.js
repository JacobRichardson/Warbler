/** 
 * Index for models.
 */

//Imports.
const mongoose = require('mongoose');

//Set debug to true.
mongoose.set("debug", true);

//Make Mongo use promises.
mongoose.Promise = Promise;

//Connect to the database.
mongoose.connect('mongodb://localhost/warbler');

//Export the user model.
module.exports.User = require('./user');

//Export the message model.
module.exports.Message = require('./message');