const {Router} = require('express')
const videogamesRouter = Router()
const {Videogame,Genre} = require('../db')
const axios = require("axios")
require('dotenv').config();
const { API_KEY } = process.env
const getAllData = require('../utils/DataVideogames')


//https://api.rawg.io/api/games/{id}
// GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
videogamesRouter.get('/', async(req,res)=>{

    const {name} = req.query
    let allVideogames = await getAllData()

    if(name){
        try {
            const dataByName = await allVideogames.filter(vg => vg.name.toLowerCase().includes(name.toLowerCase()))
            res.status(200).send(dataByName)
            
        } catch (error) {
            res.status(400).send({error:error.message})
        }

    }else{
        try {
            res.status(200).send(allVideogames)
            
        } catch (error) {
            res.status(400).send({error:error.message})
        } 
    }
})

// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
// videogamesRouter.get('',async(req,res)=>{
//     const {name} = req.query
//     try {
//         const apiData = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`,{
//         headers:{
//             'Accept-Encoding': 'null'
//         }
//             });
//         let apiVideogames = []
//         for(let i=0; i<apiData.length; i++){
//             if(apiData.data.results.name === name && apiVideogames.length<=15){
//                 apiVideogames.push(apiData)
//             }
//         }
//         const videogameDB = await Videogame.findAll()
//         const response = [...apiVideogames, ...videogameDB]
//         res.status(200).send(response)
        
//     } catch (error) {
//         res.status(400).send({error:error.message})
//     } 
// })


videogamesRouter.post('/', async(req,res)=>{
    const {name,description,platforms} = req.body

    try {
        await Videogame.create({name,description,platforms})
        res.status(201).send('videojuego creado')
        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});

module.exports = videogamesRouter;





// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// [ ] POST /videogames:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos, relacionado a sus géneros.