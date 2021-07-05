const Category = require('../models/categoryModel');

// Parei em 3:49 #5

const categoryCtrl = {
  getCategories : async (req, res)=>{
    try {
      const categories = await Category.find();

      return res.json(categories)
    } catch (error) { res.status(500).json({ msg: error.message }) }
  },
  createCategory : async (req, res)=>{
    try {
      // admin crud
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if(category) return res.status(400).json({ msg: "Essa categoria já existe" });

      const newCategory = new Category({ name });
      
      await newCategory.save();
      
      res.json({ msg: `Categoria ${newCategory.name} criada!` });
    } catch (error) { res.status(500).json({ msg: error.message }) }
  },
  deleteCategory : async(req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);

      return res.json({ msg: "Category apagada!" })
    } catch (error) { res.status(500).json({ msg: error.message }) }
  },
  updateCategory : async(req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Categoria editada!" })
    } catch (error) { res.status(500).json({ msg: error.message }) }
  }
}

module.exports = categoryCtrl;