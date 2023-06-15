const jwt = require('jsonwebtoken')

const currentUser = (req, res, next) => {
  if (!req.session.jwt)
    throw "Please, sign In!!"

  const user = jwt.verify(req.session.jwt, 'secret-jwt')
  req.currentUser = user;
  next()
}

const ensureSignedIn = (req, res, next) => {
  if (!req.session.jwt)
    throw "Please, sign In!!"

  next();
}

const ensureSignedOut = (req, res, next) => {
  if (req.session.jwt)
    throw "Already signed in !!"

  next();
}

module.exports = {
  currentUser,
  ensureSignedIn,
  ensureSignedOut
}