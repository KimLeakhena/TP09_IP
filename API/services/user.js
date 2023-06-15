const Users = require("../models/users");
var bcrypt = require("bcryptjs");

const findById = async (id) => {
  try {
    const user = await Users.findById(id);
    return user;
  } catch (err) {
    throw "User is not found";
  }
};

const findAll = async () => {
  // to do
  return await Users.find();
};

const updatedPass = async (req, res) => {
  // to do
  const { id, old_password, new_password } = req.body;

  //console.log(user)
  try {
    const user = await Users.findById(id);
    if (!user.matchesPassword(old_password)) {
      throw "Incorrect Information!!";
    }
    var salt = bcrypt.genSaltSync(10);
    var newpassword = bcrypt.hashSync(new_password, salt);

    await user.updateOne({ password: newpassword });

    return {
      success: true,
      data: newpassword,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Incorrect Password!!",
    };
  }
};

const updated = async (req, res) => {
  const { id, username, firstName, lastName } = req.body;

  try {
    const doc = await Users.findById(id);
    //update data
    doc.username = username;
    doc.firstName = firstName;
    doc.lastName = lastName;
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const removed = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleted = await Users.deleteOne({ _id: id });
    console.log("deleted", deleted);
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

module.exports = {
  findById,
  updatedPass,
  updated,
  removed,
  findAll,
};
