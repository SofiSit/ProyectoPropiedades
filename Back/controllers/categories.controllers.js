const { categoriesServices } = require("../services");

const createCategory = async (req, res) => {
  try {
    if (!req.user.admin)
      return res.status(401).send({ message: "No autorizado" });
    const category = await categoriesServices.createCategory(req.body);
    return res.status(201).send(category);
  } catch (error) {
    console.log("Error");
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await categoriesServices.listCategories();
    return res.status(200).send(categories);
  } catch (error) {
    console.log("Error");
  }
};

const updateCategory = async (req, res) => {
  try {
    if (!req.user.admin)
      return res.status(401).send({ message: "No autorizado" });
    const { id } = req.params;
    const { body } = req;
    const catUpdated = await categoriesServices.updateCategory(id, body);
    return res.status(200).send(catUpdated);
  } catch (error) {
    console.log("Error");
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!req.user.admin)
      return res.status(401).send({ message: "No autorizado" });
    const { id } = req.params;
    const catdeleted = await categoriesServices.deleteCategory(id);
    return res
      .status(200)
      .send(`Category with id: ${id} was successfully deleted`);
  } catch (error) {
    console.log("Error");
  }
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
};
