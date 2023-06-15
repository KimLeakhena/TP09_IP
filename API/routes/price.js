var express = require('express');
const joValid = require('../middleWare/joiValid');
const auth = require('../middleWare/auth');
const { } = require('../schema');
var router = express.Router();
const priceService = require('../services/price');

router.get('/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  res.json({});
})

router.post('/created', auth.ensureSignedIn, async (req, res) => {
  const { product, price, source } = req.body;
  const result = await priceService.created({ product, price, source })
  res.json(result);
})

// // all itens
// router.get('/all', (req, res) => {
//   // to do
// })

// router.post('/updated', auth.ensureSignedIn, async (req, res, next) => {
//   // to do
//   res.json({});
// })

router.post('/deleted', auth.ensureSignedIn, async (req, res, next) => {
  // to do
  res.json({});
})

module.exports = router