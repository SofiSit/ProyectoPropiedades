const { propertiesServices } = require("../services");

const createProperty = async (req, res) => {
  try {
    if (!req.user.admin)
      return res.status(401).send({ message: "No autorizado" });
    const { categories } = req.body;
    delete req.body.categories; // borramos el campo categories del req.body
    const property = await propertiesServices.createProperty(
      req.body,
      categories
    );
    if (property.id) return res.status(201).send(property);
  } catch (error) {
    console.log("Error", error);
  }
};

const listProperties = async (req, res) => {
  try {
    let query = {};
    let priceOrder = "";
    if (req.query.onSale) {
      query.onSale = true;
    }
    if (req.query.toRent) {
      query.toRent = true;
    }
    if (req.query.categoryId) {
      query.categoryId = req.query.categoryId;
    }
    if (req.query.location) {
      query.location = req.query.location;
    }
    if (req.query.priceOrder) {
      priceOrder = req.query.priceOrder;
    }
    const properties = await propertiesServices.listProperties(
      query,
      priceOrder
    );
    return res.status(200).send(properties);
  } catch (error) {
    console.log("Error", error);
  }
};

const updateProperty = async (req, res) => {
  try {
    if (!req.user.admin)
      return res.status(401).send({ message: "No autorizado" });
    const { id } = req.params;
    const propUpdated = await propertiesServices.updateProperty(id, req.body);
    return res.status(200).send(propUpdated);
  } catch (error) {
    console.log("Error", error);
  }
};

const destroyProperty = async (req, res) => {
  try {
    if (!req.user.admin)
      return res.status(401).send({ message: "No autorizado" });
    const { id } = req.params;
    const prope = await propertiesServices.destroyProperty(id);
    return res
      .status(200)
      .send({ message: `Property with id: ${id} was successfully deleted` });
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = {
  createProperty,
  listProperties,
  updateProperty,
  destroyProperty,
};
