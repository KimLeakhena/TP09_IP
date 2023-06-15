const Jwt = require("jsonwebtoken");

const createASessionToken = (userId, email) => {
  return Jwt.sign(
    {
      _id: userId,
      email,
    },
    "secret-jwt"
  );
};

module.exports = {
  createASessionToken,
};
