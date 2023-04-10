const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const checkJwt = require('../../middlewares/checkJwt');
const User = require('../models/userModel');


/**
 * Signin route 
 * @route POST /signin
 * @summary Respond with signin succes 
 * @group User 
 * @param {User.model} object.body.required Object containing propertis to insert
 * @return {String} 200 - Signin succes 
 * @returns {String} 500 - An error message 
 */
router.post('/signin', userController.signin)

/**
 * Login route 
 * @route POST /login
 * @summary Respond with login success 
 * @group User 
 * @param {User.model} object.body.required Object containing propertis to insert
 * @return {String} 200 - login success 
 * @returns {String} 500 - An error message 
 */
router.post('/login', userController.login);

/**
 * Login route 
 * @route POST /signout
 * @summary Respond with signout success 
 * @group User 
 * @return {String} 200 - login success 
 * @returns {String} 500 - An error message 
 */
router.get('/signout', checkJwt, userController.signout)

/**
 * Get all users
 * @route GET /users
 * @summary Respond with all users
 * @group User
 * @return {Array<User>} 200 - an array of users
 * @returns {String} 500 - An error message
 * @security JWT
 * @param {string} id.path.required the id of user to update must be valid objectID
 * @param {User.model} object.body.required - the propertie to update
 * @return {String} 200 -  string The user updated
 * @returns {String} 500 - An error message
 */
router.get('/users', checkJwt, userController.getAllUsers);

/**
 * Update one user
 * @route PUT /user/{id}
 * @summary Respond with string "user updated"
 * @group User
 * @param {string} id.path.required the id of user to update must be valid objectID
 * @param {User.model} object.body.required - the propertie to update
 * @return {String} 200 -  string The user updated
 * @returns {String} 500 - An error message
 * @security JWT
    */
router.put('/user/update/:id', checkJwt, userController.updateUser);

module.exports = router