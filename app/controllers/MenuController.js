const MenuModel = require('../models/MenuModel');
const commandModel = require('../models/CommandeModel')

const cacheV1 = require('../../services/cache-V1');

// Add an Menu 
async function addPlat(req, res){
    try {
        // Récupérer les valeurs des éléments à inserer 
        const {plat,prixMenu} = req.body;
        // Crer une nouvelle instance de l'Menu 
        const Menu = new MenuModel({
            plat,
            prixMenu            
        })
        // Sauvegarder tous ça en base
        await Menu.save();
        res.status(201).json({message: "ok"});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Get all Menus 
async function getAllMenus (req, res) {
    try {
        const Menus = await MenuModel.find();
        const MenusWithcommands = await Promise.all(
            Menus.map(async (Menu) => {
                const command = await commandModel.find({menu: Menu._id}, {_id:0, plat:1});
                return {...Menu.toObject(), commands}
            })
        )
        res.json(MenusWithCommands)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


// Update Menu 
async function updateMenu (req, res) {
    try {
        const {plat, prixMenu} = req.body;
        const Menu = await MenuModel.findById({_id : req.params.id, author: req.payload._id});
        Menu.plat = plat;
        Menu.prixMenu = prixMenu;
        await Menu.save();
        res.json({message: "Menu updated"});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Delete an Menu 
async function deleteMenu (req, res){
    try {
        const Menu = await MenuModel.findById({_id : req.params.id, author: req.payload._id});
        await Menu.deleteOne();
        res.json({message: 'Menu removed'});
      
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// search Menu 
async function searchMenu(req, res){
    try {
    //   récupération du terme recherché 
    const searchTerm = req.query.query;
    const Menus  = await MenuModel.find({
        $or: [
            {plat: {$regex: new RegExp(searchTerm, "i")}},
            {prixMenu: {$regex: new RegExp(searchTerm, "i")}},
        ]
    })

    res.json(Menus);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

async function getMenuById(req, res) {
    try {
      const { menuId } = req.params;
  
      const menu = await MenuModel.findById(menuId);
  
      if (!menu) {
        return res.status(404).json({ message: "Menu non trouvé" });
      }
  
      res.json(menu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


module.exports = {
    addPlat,
    getAllMenus,
    updateMenu,
    deleteMenu,
    searchMenu,
    getMenuById
}