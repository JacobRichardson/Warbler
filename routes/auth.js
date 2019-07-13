/** 
 * Authentication routes.
 */

//Imports.
const express = require('express');
const router = express.Router();
const {
    signUp,
    signIn
} = require('../handlers/auth');

//Sign up route using the signup function.
router.post("/signup", signUp);
router.post("/signin", signIn);

//Export the router.
module.exports = router;