const {Schema, model} = require('../../database');

/**
 * An entity representing comment model
 * @typedef Commande
 * @property {Date} dateCde
 * @property {Date} dateLivraison
 * @property {Date} publication_date
 *  * 
 */

const commentSchema = new Schema({
    dateCde : {type : Date, required : true},
    dateLivraison : {type : Date, required: false},
    user: {type: Schema.Types.ObjectId,ref: 'User'},
    menu: {type: Schema.Types.ObjectId,ref: 'Menu'}
});

const Commande = model ('Commande', commentSchema);

module.exports = Commande;