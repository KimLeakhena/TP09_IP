const categories = require("../models/categories");

const findById = async (id) => {
  // to do
  const result = await categories.findById(id);
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
  // to do
};

const findCategoriesItems = async () => {
  return await categories.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "category",
        as: "items",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        desc: 1,
        imageUrl: 1,
        items: {
          _id: 1,
          name: 1,
          category: 1,
          desc: 1,
        },
      },
    },
  ]);
};

const created = async (newCategory) => {
  // to do
  const createdCate = await categories.create(newCategory);
  return createdCate;
};

const updated = async (req, res) => {
  // to do

  const { id, name, desc, imageUrl } = req.body;
  // console.log(id)
  try {
    const doc = await categories.findById(id);
    
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

const removed = async (req, res) => {
  // to do

  const { id } = req.params;

  try {
    const deleted = await categories.deleteOne({ _id: id });
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
  findCategoriesItems,
};
