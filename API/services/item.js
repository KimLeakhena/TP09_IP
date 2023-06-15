const items = require("../models/items");

const findById = async (id) => {
  const result = await items.findById(id);
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
  return await items.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "category",
        as: "items",
      },
    },
  ]);
};

const created = async (newItem) => {
  // 
  try {
    const { name,category,desc } = newItem;
    const subcate = await items.findOne({ name });
    if (subcate)
         throw 'The item is already have~'
    // create new 
    const NewCate = {
         name,
         category,
         desc,
    }
    const createCate = await items.create(NewCate);
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

  const { id, name, desc, imageUrl } = req.body;
  //console.log(id)
  try {
    const doc = await items.findById(id);
    //update data
    doc.name = name;
    doc.desc = desc;
    doc.imageUrl = imageUrl;
    await doc.save();
    res.json({ success: true, data: doc });

  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const removed = async (res, req) => {
  // to do
  const { id } = req.params;

  console.log(id);
  try {
    const deleted = await items.deleteOne({ _id: id });

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
