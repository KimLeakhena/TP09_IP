
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: async val => Users.doesntExist({username: val}),
      msg: ({ value }) => `Invalid Username ${value}!!`,
    }
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {

  //time created, updated
  
  timestamps: true,
  toJSON: {
    transform(doc, ret){
      delete ret.password;
    }
  }
});

//local var salt String

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
})

//check confirm password

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.statics.doesntExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

//create a user
var Users = mongoose.model('Users', userSchema);


module.exports = Users;
