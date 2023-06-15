var express = require('express');
const joiValid = require('../middleWare/joiValid');
const auth = require('../middleWare/auth');
const { } = require('../schema');
var router = express.Router();

const itemService = require('../services/item');

router.get('/id/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await itemService.findById(id);
  res.json(result);

  
})

router.post('/created', auth.ensureSignedIn, async (req, res, next) => {
  const { name, desc, category } = req.body;
  const result = await itemService.created({ name, desc, category })
  res.json(result);
})


// all items
router.get('/all', auth.ensureSignedIn, async (req, res) => {
  
  const result = await itemService.findAll();
  res.json(result);
  // to do

})

router.post('/updated', auth.ensureSignedIn, async (req, res, next) => {
  const result = await itemService.updated(req,res);
  res.json(result);
})

router.post('/deleted/:id', auth.ensureSignedIn, async (req, res, next) => {
  // to do
const result = await itemService.removed(res,req);
  res.json(result);

})

module.exports = router