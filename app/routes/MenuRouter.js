const express = require('express');

const router = express.Router();

const MenuController = require('../controllers/MenuController');
const checkJwt = require('../../middlewares/checkJwt');
const {cache, flush} = require('../../middlewares/cache');
const Menu = require('../models/MenuModel');

/**
 * Add one Menu
 * @route POST /Menu
 * @summary Respond with string "ok"
 * @group Menu
 * @param {Menu.model} object.body.required Object containiing the property to insert
 * @return {String} 200 - "ok"
 * @returns {String} 500  - An error message 
 */

router.post('/menu/add', checkJwt, flush, MenuController.addPlat);

/**
 * Get all Menus
 * @route GET /Menu
 * @summary Respond with all Menus
 * @group Menu
 * @return {Array<Menu>} 200 - an array of Menus
 * @returns {String} 500 - An error message 
 */

router.get('/Menus', cache, MenuController.getAllMenus);


/**
 * Update one Menu 
 * @route PUT /Menu/{id}
 * @summary Respond with string "Menu updated"
 * @group Menu
 * @param {string} id.path.required the id of Menu to update must be valid objectID
 * @param {Menu.model} object.body.required - the propertie to update 
 * @return {String} 200 -  string The Menu updated 
 * @returns {String} 500 - An error message 
 */
router.put('/Menu/update/:id', checkJwt, flush, MenuController.updateMenu);


/**
 * Delete one Menu 
 * @route DELETE /Menu/{id}
 * @summary Respond with string "Menu removed"
 * @group Menu
 * @param {string} id.path.required the id of Menu to update must be valid objectID
 * @return {String} 200 -  string The Menu removed
 * @returns {String} 500 - An error message 
 */
router.delete('/Menu/delete/:id', checkJwt, flush, MenuController.deleteMenu);


/**
 * Get all Menus
 * @route GET /searchMenu/search
 * @summary Respond with all Menus taht match with the search query 
 * @group Menu
 * @param {String} search.query.required - the cseatch query to match Menus
 * @return {Array<Menu>} 200 - an array of Menus
 * @returns {String} 500 - An error message 
 */
router.get('/searchMenu/search', cache, MenuController.searchMenu)

/**
 * Get one Menu
 * @route GET /Menu/{id}
 * @summary Respond with one Menu
 * @group Menu
 * @param {string} id.path.required the id of Menu to update must be valid objectID
 * @return {String} 200 -  string The Menu removed
 * @returns {String} 500 - An error message
 */
router.get('/Menu/:id', cache, MenuController.getMenuById); 


module.exports = router;