/** 
 * Authentication routes.
 */

//Imports.
const express = require('express');
const router = express.Router();
const signUp = require('../handlers/auth').signUp;

//Sign up route using the signup function.
router.post("/signup", signUp);

//Export the router.
module.exports = router;