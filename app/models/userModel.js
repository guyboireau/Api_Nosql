const {Schema, model} = require('../../database');

/**
 * A entity repensenting a user informations/model
 * @typedef User
 * @property {String} email
 * @property {String} password
 * @property {String} rueClient
 * @property {String} villeClient
 * @property {Number} codePostalClient
 * @property {String} telephoneClient
 * @property {String} nomClient
 * @property {String} prenomClient
 * 
 */

const userSchema = new Schema ({
    email : {type : String, required: true, unique: true},
    password: {type : String, required: true},
    rueClient: {type : String, required: true},
    villeClient: {type : String, required: true},
    codePostalClient: {type : Number, required: true},
    telephoneClient: {type : String, required: true},
    nomClient: {type : String, required: true},
    prenomClient: {type : String, required: true}
});

const User = model('User', userSchema);

module.exports = User;