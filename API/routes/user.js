var express = require('express');
const joiValidation = require('../middleWare/joiValid');
const auth = require('../middleWare/auth');
const { } = require('../schema');
var router = express.Router();
const userService = require('../services/user');

router.get('/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await userService.findById(id);
  res.json(result);
})

// all users
router.get('/all', auth.ensureSignedIn,  async (req, res) => {
  const result = await userService.findAll();
//  console.log(req.body);
 res.json(result);
})

router.post('/updated-password', auth.ensureSignedIn, auth.currentUser, async (req, res, next) => {
 // to do
 const result = await userService.updatedPass(req, res);
 //console.log(req.body);
 res.json(result);

})

router.post('/updated', auth.ensureSignedIn, async (req, res, next) => {
 // to do
 result = await userService.updated(req, res);

 res.json(result);
})

router.post('/deleted/:id', auth.ensureSignedIn, async (req, res, next) => {
 // to do
 result = await userService.removed(req, res);
 res.json(result);
 
})

module.exports = router