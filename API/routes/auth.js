
var express = require('express');
var router = express.Router();

const joiValid = require('../middleWare/joiValid');
const auth = require('../middleWare/auth');
const { signInSchema, signUpSchema } = require('../schema');

const { login } = require('../services/login')
const { register } = require('../services/register');
const userService = require('../services/user');
const { logout } = require('../services/logout');

router.get('/me', auth.ensureSignedIn, auth.currentUser, async function (req, res, next) {
  const { currentUser } = req;
  const result = await userService.findById(currentUser?._id);
  res.json(result);
})

router.post('/logout', auth.ensureSignedIn, async (req, res) => {
  const result = logout(req.session);
  return res.json(result);
})

router.post('/login', auth.ensureSignedOut, joiValid(signInSchema), async (req, res, next) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  req.session.jwt = result?.data?.token

  res.json(result);
})

router.post('/register', auth.ensureSignedOut, joiValid(signUpSchema), async (req, res, next) => {
  const createdUser = await register(req.body)
  res.json(createdUser);
})

module.exports = router