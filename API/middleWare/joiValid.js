
//create from index.js (router) no need to repeat the same script 

const joiValid =  (schema) => {

  //return+space then return
    //return is a function
  return async (req, res, next) => {
    try {
      const body = req.body;
      await schema.validateAsync(body);
    } catch (err) {
      return res.json({ success: false, error: err })
    }
    next();
  }
}


module.exports = joiValid;