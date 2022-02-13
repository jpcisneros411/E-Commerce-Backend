const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const Categories = Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product}]
    });
    res.status(200).json(Categories);
  } 
  
    catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const Categories = Category.findByPk(req.params.id, {
    // be sure to include its associated Products
      include: [{ model:Product ,through: Product, as: ''}]
  });

  if (!Categories){
    res.status(404).json({ message: 'No location found with this id!'});
    return;
  }

  res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const Categories = Category.create(req.body);
    res.status(200).json(Categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    Category.update(req.body, {
      where:{
        id: req.params.id,
      },
    });
    if (!Categories) {
        res.status(404).json({ message: "No location found with this id!" });
    }
    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const Categories = Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!Categories){
      res.status(404).json({ message: 'No categories found with this id!'});
      return;
    }

    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
