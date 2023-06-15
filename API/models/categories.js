var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: String,
  imageUrl: String,
}, {
  timestamps: true
});

var CategoriesSchema = mongoose.model('categories', categoriesSchema);
module.exports = CategoriesSchema;
