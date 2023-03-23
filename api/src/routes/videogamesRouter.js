const {Router} = require('express')
const videogamesRouter = Router()
const {Videogame,Genre} = require('../db')
const axios = require("axios")
require('dotenv').config();
const { API_KEY } = process.env
const getAllData = require('../utils/DataVideogames')


//https://api.rawg.io/api/games/{id}

videogamesRouter.get('/', async(req,res)=>{

    const {name} = req.query
    let allVideogames = await getAllData()

    // [ ] GET /videogames?name="...":
    // Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
    // Si no existe ningún videojuego mostrar un mensaje adecuado
    if(name){
        try {
            const dataByName = await allVideogames.filter(vg => vg.name.toLowerCase().includes(name.toLowerCase()))
            let silcedData = dataByName.slice(0,15)
            res.status(200).send(silcedData)
            
        } catch (error) {
            res.status(400).send({error:error.message})
        }

    }else{
        // GET /videogames:
        // Obtener un listado de los videojuegos
        // Debe devolver solo los datos necesarios para la ruta principal
        try {
            res.status(200).send(allVideogames)   
        } catch (error) {
            res.status(400).send({error:error.message})
        } 
    }
})


// [ ] POST /videogames:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos, relacionado a sus géneros.
videogamesRouter.post('/', async(req,res)=>{
    let {name,description,platforms,createdInDB,genres} = req.body

    try {
        let videogameCreated = await Videogame.create({name,description,platforms,createdInDB})

        let genresDB = await Genre.findAll({where:{name:genres}})
        videogameCreated.addGenre(genresDB)
        res.status(201).send('videojuego creado')
        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});


// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados






module.exports = videogamesRouter;