const router = require('express').Router();
const { Tag, Product, ProductTag} = require('../../models');
//tag was in above const twice, removed the second one after producttag
// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
    try {
      const Tags = Tags.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }]
      });
      res.status(200).json(Tags);
    } 
    catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try{
  // be sure to include its associated Product data
    const Tag = Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });

    if (!Tag) {
      res.status(404).json({ message: "No tag found with provided id!" });
    }
    res.status(200).json(Tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const Tag = Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(tag.body, {
    where: {
      id: req.params.id,
    }
  })
  .then
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    Tag = Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!Tag){
      res.status(404).json({ message: 'No tag found with this id!'});
      return;
    }

      res.status(200).json(Tag);
    } catch (err) {
      res.status(500).json(err);
    }     
  
});

module.exports = router;
