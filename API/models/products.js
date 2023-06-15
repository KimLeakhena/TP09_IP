
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  title: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'items'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  imageUrl: String,
  desc: String,
}, {
  timestamps: true,
});

productSchema.index({ title: 'text' });
var Posts = mongoose.model('products', productSchema);
module.exports = Posts;
