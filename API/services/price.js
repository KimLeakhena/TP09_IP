const prices = require("../models/prices");

const findAll = async () => {
  // to do
};

const created = async (newPrice) => {
  // to do
  const createdPrice = await prices.create(newPrice);

  return createdPrice;
  
};

const updated = async () => {
  // to do
};

const removed = async () => {

  // to do

};

module.exports = {
  updated,
  removed,
  findAll,
  created,
};
