const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword} = require('../../services/auth')

// Inscription 
async function signin (req, res){
    try {
        // Récupérer les emails et mots passes entrés par l'utilisateurs 
        const {email, password} = req.body;

        // Vérrifier si l'utilisateur existe déjà 
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exist "});
        }

        // hasher le mot de passe entré par l'utilisateur 
        const hashedPassword = await hashPassword(password);

        // Insérer tous ça dans le donnée 
        const newUser = new userModel({
            email,
            password: hashedPassword
        });

        await newUser.save()

        // Renvoie un message de succès 
        res.json({message: "signin success "})
        
    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

// Login 
async function login (req, res) {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(400).send("wrong email");
        const match = await comparePassword(password, user.password);
        if(!match) return res.status(400).send("wrong password");
        const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '3600s', algorithm: 'HS256'});
        res.setHeader('Authorization', token)
        res.json({message: "login success"})

    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

async function signout (req, res) {
    try {
        req.payload.exp = Math.floor(Date.now()/1000) - (60*60);
        const token = jwt.sign(req.payload, process.env.SECRET, {algorithm: 'HS256'});

        res.setHeader('Authorization', token);

        req.payload = undefined;

        res.json({message: 'signout success'})
        
    } catch (error) {
        res.status(500).json({message : error.message })
    }
}

async function getAllUsers(req, res) {
    try {
      const users = await UserModel.find();
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

async function updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { email, password, rueClient, villeClient, codePostalClient, telephoneClient, nomClient, prenomClient } = req.body;
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { email, password, rueClient, villeClient, codePostalClient, telephoneClient, nomClient, prenomClient },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  


module.exports = {
    signin,
    login,
    signout,
    getAllUsers,
    updateUser
}