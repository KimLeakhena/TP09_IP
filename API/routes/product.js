var express = require('express');
const joiValid = require('../middleWare/joiValid');
const auth = require('../middleWare/auth');
const { } = require('../schema');
var router = express.Router();

const productService = require('../services/product');

router.get('/id/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await productService.findById(id);
  res.json(result);
})

// all
router.get('/all', async (req, res) => {
  const result = await productService.findAll();
  res.json(result);
})

router.post('/created', auth.ensureSignedIn, async (req, res,) => {
  const { title, category, item, user, imageUrl, desc, } = req.body;

  const result = await productService.created({
    title,
    category,
    item,
    user,
    imageUrl,
    desc,
  })
  res.json(result);
})

router.post('/updated', auth.ensureSignedIn, async (req, res, next) => {
  const result = await productService.updated(req,res);
  res.json(result);
})

router.post('/deleted/:id', auth.ensureSignedIn, async (req, res, next) => {
  const result = await productService.removed(res,req);
  res.json(result);

})

module.exports = router