const { Favorite }= require ("../models")



const createFavorite= async (body)=>{
    return await Favorite.create(body)
};


const findFavorites= async (userId)=>{
    return await Favorite.findAll({
        where: { userId },
    })
};

const destroyFavorite= async (id)=>{
    const fav= await Favorite.findByPk(id)
    return fav.destroy();
}

module.exports= {createFavorite, findFavorites, destroyFavorite}