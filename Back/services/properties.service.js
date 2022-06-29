const { Property, Category } = require("../models");

const createProperty = async (body, categories) => {
  // recorrimos la categoria y por cada categoria encontramos la categoria en si
  const prop = await Property.create(body);
  return await Promise.all(
    // el map no es asincrono y el promise.all es una manera de hacerlo async
    categories.map(async (catId) => {
      //creamos la prop y aderimos la o las cat que vengan, categpries es un array que lo recorremos y le adherimos la categoria  ala propiedad
      const category = await Category.findByPk(catId);
      prop.addCategory(category);
      return prop;
    })
  );
};

const listProperties = async (query, priceOrder) => {
  console.log("query", query);
  let order = "DESC";
  if (query.categoryId) {
    const { categoryId } = query;
    const category = await Category.findByPk(categoryId);
    if (!category) return { error: "Not found" };
    return await category.getProperties();
  }
  if (priceOrder === "ascendente") {
    order = "ASC";
  }

  return await Property.findAll({
    where: query,
    order: [["price", order]],
    // attributes:['name', 'price', 'available']
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
};

const updateProperty = async (id, body) => {
  const prop = await Property.findByPk(id);
  return await prop.update(body, { new: true });
};

const destroyProperty = async (id) => {
  const prope = await Property.findByPk(id);
  return await prope.destroy();
};

module.exports = {
  createProperty,
  listProperties,
  updateProperty,
  destroyProperty,
};
