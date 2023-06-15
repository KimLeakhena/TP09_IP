
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pricesSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  price: Number,
  source: String,
}, {
  timestamps: true,
});

var Prices = mongoose.model('prices', pricesSchema);
module.exports = Prices;
