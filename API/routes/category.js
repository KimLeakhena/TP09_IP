var express = require('express');
const joiValid = require('../middleWare/joiValid');
const auth = require('../middleWare/auth');
const { } = require('../schema');
var router = express.Router();
const categoryService = require('../services/category');

router.get('/id/:id', auth.ensureSignedIn, async function (req, res) {
  
  const { id } = req.params;
  const result = await categoryService.findById(id);

  res.json(result);
})

// Categories items
router.get('/categories-items', async (req, res) => {
  const result = await categoryService.findCategoriesItems()
  res.json(result);
})

router.post('/created', auth.ensureSignedIn, async (req, res, next) => {
  const { name, desc, imageUrl } = req.body;
  const result = await categoryService.created({ name, desc, imageUrl })
  res.json(result);
})

// all categories
router.get('/all',auth.ensureSignedIn, async (req, res) => {
 const result = await categoryService.findCategoriesItems()
  res.json(result);
})

router.post('/updated', auth.ensureSignedIn, async (req, res, next) => {
  // to do

  const result = await categoryService.updated(req,res);

  res.json(result);
})

router.post('/deleted/:id', auth.ensureSignedIn, async (req, res, next) => {
  const result = await categoryService.removed(req, res);
  res.json(result);
})

module.exports = router