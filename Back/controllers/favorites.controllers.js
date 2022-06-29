const { favoritesServices }= require ("../services")

const createFavorite = async (req, res) => {
  try {
    const { id } = req.user
    req.body.userId = id
    const newFav = await favoritesServices.createFavorite(req.body);
    return res.status(201).send(newFav);
  } catch (error) {
    console.log("Error");
  }
};

const findFavorites = async (req, res) => {
  try {
    const { userId }= req.params;
    const listFavs = await favoritesServices.findFavorites(userId)
     return res.status(200).send(listFavs)
  } catch (error) {
    console.log("Error");
  }
};

const destroyFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const favo = await favoritesServices.destroyFavorite(id);
    return res
      .status(200)
      .send(`Success DELETING favorites`);
  } catch (error) {
    console.log("Error");
  }
};

module.exports = { createFavorite, findFavorites, destroyFavorite };
