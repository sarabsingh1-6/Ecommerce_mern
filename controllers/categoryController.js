const Category = require("../modals/categoryModel");
const slugify = require("slugify");

// create caterogy controller
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        succcess: true,
        message: "Category Already Exisits",
      });
    }
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

//update category controller
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating category",
      error,
    });
  }
};

// getting all category controller
const categoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      messgae: "All category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messgae: "Error in getting categories",
      error,
    });
  }
};

// getting single category controller
const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }); //finding the category using the slug
    res.status(200).send({
      success: true,
      message: "Getting single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single category",
      error,
    });
  }
};

// delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete(id);
    res.status(200).send({
      success: true,
      message: `Deleted ${category.name} Successfully`,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      status: false,
      message: "Failed to delete the category",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
