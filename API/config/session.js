var session = require("express-session");

//key value for store frequently accessed data 
module.exports = async (app) => {


  app.use(
    session({
      secret: "secret",
      resave: true,
      rolling: true,
      saveUninitialized: true,
      name: "access_token",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
      },
    })
  );
};
