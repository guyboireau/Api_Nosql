const CommandeModel = require('../models/CommandeModel');

// add Commande 
async function addCommande (req, res) {
    try {
        const { dateCde, user, menu } = req.body;

        const commande = new CommandeModel({
            dateCde,
            user,
            menu
        });

        await Commande.save();
        res.status(201).json({message: 'Commande added'})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Get all Commandes
async function getAllCommandes (req, res) {
    try {
        const commandes = await CommandeModel.find();
        res.json(commandes)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Update Commande
async function updateCommande(req, res) {
    try {
      const { id } = req.params;
      const { dateCde, dateLivraison, user, menu } = req.body;
  
      const updatedCommande = await CommandeModel.findByIdAndUpdate(
        id,
        { dateCde, dateLivraison, user, menu },
        { new: true }
      );
  
      if (!updatedCommande) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
  
      res.json({ message: "Commande mise à jour avec succès", commande: updatedCommande });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
// Delete an Commande
async function deleteCommande (req, res){
        
    try { 
        const { id } = req.params;
        const deletedCommande = await CommandeModel.findByIdAndDelete(id);
        if (!deletedCommande) {
            return res.status(404).json({ message: "Commande non trouvée" });
            }
        res.json({message: 'Commande removed'});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


//get Commande by id
async function getCommandeById(req, res) {
    try {
        const { id } = req.params;

        const commande = await CommandeModel.findById(id);

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get Commande by user
async function getCommandesByUser(req, res) {
    try {
      const { userId } = req.params;
  
      const commandes = await CommandeModel.find({ user: userId });
  
      if (commandes.length === 0) {
        return res.status(404).json({ message: "Aucune commande trouvée pour cet utilisateur" });
      }
  
      res.json(commandes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
//get Commande by menu
async function getCommandesByMenu(req, res) {
    try {
      const { menuId } = req.params;
  
      const commandes = await CommandeModel.find({ menu: menuId });
  
      if (commandes.length === 0) {
        return res.status(404).json({ message: "Aucune commande trouvée pour ce menu" });
      }
  
      res.json(commandes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addCommande,
    getAllCommandes,
    updateCommande,
    deleteCommande,
    getCommandeById,
    getCommandesByMenu
}