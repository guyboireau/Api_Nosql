const express = require('express');

const router = express.Router();
const CommandeController = require('../controllers/commandeController')
const checkJwt = require('../../middlewares/checkJwt');

/**
 * add one Commande to an article 
 * @route POST /Commande/{id}
 * @summary Responds with Commande added
 * @group Commande 
 * @param {String} id.path.required - the id of the article 
 * @param {Commande.model} object.body.required Object containing the properties to insert
 * @return {String} 200 - Commande added
 * @returns {String} 500 - An error message 
 */
router.post('/Commande/add/:id', checkJwt, CommandeController.addCommande);

/**
 * Get all Commandes
 * @route GET /Commande
 * @summary Respond with all Commandes
 * @group Commande
 * @return {Array<Commande>} 200 - an array of Commandes
 * @returns {String} 500 - An error message
 */ 
router.get('/Commandes', CommandeController.getAllCommandes);

/**
 * Update one Commande
 * @route PUT /Commande/{id}
 * @summary Respond with string "Commande updated"
 * @group Commande
 * @param {string} id.path.required the id of Commande to update must be valid objectID
 * @param {Commande.model} object.body.required - the propertie to update
 * @return {String} 200 -  string The Commande updated
 * @returns {String} 500 - An error message
 */
router.put('/Commande/update/:id', checkJwt, CommandeController.updateCommande);

/**
 * Delete one Commande
 * @route DELETE /Commande/{id}
 * @summary Respond with string "Commande removed"
 * @group Commande
 * @param {string} id.path.required the id of Commande to update must be valid objectID
 * @return {String} 200 -  string The Commande removed
 * @returns {String} 500 - An error message
 */
router.delete('/Commande/delete/:id', checkJwt, CommandeController.deleteCommande);

/**
 * Get one Commande
 * @route GET /Commande/{id}
 * @summary Respond with one Commande
 * @group Commande
 * @param {string} id.path.required the id of Commande to update must be valid objectID
 * @return {String} 200 -  string The Commande removed
 * @returns {String} 500 - An error message
    */
router.get('/Commande/:id', CommandeController.getCommandeById);

/**
 * Get all Commandes by user
 * @route GET /Commande/user/{id}
 * @summary Respond with all Commandes
 * @group Commande
 * @param {string} id.path.required the id of Commande to update must be valid objectID
 * @return {Array<Commande>} 200 - an array of Commandes
 * @returns {String} 500 - An error message
 */
router.get('/Commande/user/:id', CommandeController.getCommandesByUser);

/**
 * Get all Commandes by menu
 * @route GET /Commande/menu/{id}
 * @summary Respond with all Commandes
 * @group Commande
 *  @param {string} id.path.required the id of Commande to update must be valid objectID
 * @return {Array<Commande>} 200 - an array of Commandes
 * @returns {String} 500 - An error message
 */
router.get('/Commande/menu/:id', CommandeController.getCommandesByMenu);

   

module.exports = router