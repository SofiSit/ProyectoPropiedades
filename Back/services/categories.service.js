const { Category } = require("../models"); // los modelos los exporto en services por que son los que manejan la responsabilidad de interactuar conla db

const createCategory = async (body) => {
  return await Category.create(body);
};

const listCategories = async () => {
  return await Category.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};

const updateCategory = async (id, body) => {
  const category = await Category.findByPk(id);
  return await category.update(body, { new: true });
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  return await category.destroy();
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
};
