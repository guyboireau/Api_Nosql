const {Schema, model} = require('../../database');


/**
 * An entity representing article model
 * @typedef Article
 * @property {string} plat
 * @property {number} prixMenu

 * 
 */

const articleSchema = new Schema ({
    plat : {type : String, required: true},
    prixMenu : {type : Number, required : true},
});

const Menu = model("Menu", articleSchema);

module.exports = Menu;
