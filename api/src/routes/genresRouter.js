const {Router} = require('express')
const genresRouter = Router()
const getAllData = require('../utils/DataVideogames')
const {Videogame,Genre} = require('../db')

// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

genresRouter.get('/', async(req,res)=>{
    
    const videoGamesApi = await getAllData()
    const allGenres = videoGamesApi.map(vg => vg.genres).flat()
    allGenres.forEach(eg => {
        Genre.findOrCreate({
            where: { name:eg }
        })
    })
    
    const genres = await Genre.findAll();
    res.send(genres)
})

module.exports = genresRouter;

