const products = require("../models/products");
var mongoose = require("mongoose");

const findById = async (id) => {
  const result = await products.findById(id);

  try {
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return {
      success: false,
      error: err || "error",
    };
  }
};

const findAll = async () => {
  return await products.find();


  return await products.aggregate([

   
  ]);
};

const created = async (newProduct) => {
  // const createdProduct = await products.create(newProduct);
  // return createdProduct;
  try {
    const { title,category,item,user,imageUrl,desc } = newProduct;
    const subcate = await products.findOne({ title });
    if (subcate)
         throw 'The item is already have~'
    // create new 
    const NewCate = {
         title,
         category,
         item,
         user,
         imageUrl,
         desc,
    }
    const createCate = await products.create(NewCate);
    return {
         success: true,
         msg: "Create successfully",
         data: createCate
    }
}
catch (err) {
    console.log(err);
    return {
         success: false,
         error: JSON.stringify(err) || 'error'
    }
}
};

const updated = async (req, res) => {
  // to do

  const { id, title, imageUrl, desc } = req.body;
 try {
    const doc = await products.findById(id);
    //update data
    doc.title = title;
    doc.desc = desc;
    doc.imageUrl = imageUrl;
    // const updatedProduct = await doc.save();
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const removed = async (res, req) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleted = await products.deleteOne({ _id: id });
    // res.json({ success: true, data: deleted });
    console.log("deleted", deleted);

    res.json({ success: true, data: deleted });

  } catch (error) {

    res.json({ success: false, error: error });

  }
};

module.exports = {
  findById,
  updated,
  removed,
  findAll,
  created,
};
