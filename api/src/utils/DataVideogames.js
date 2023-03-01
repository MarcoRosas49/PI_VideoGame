require('dotenv').config();
const axios = require('axios')
const {API_KEY} = process.env
const {Videogame,Genre} = require('../db');

async function getAllDataApi() {

    const allGamesApi = []

    for(let i=1; i<=5; i++){
        let apiData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`,{
            headers:{
                'Accept-Encoding': 'null'
            }
        });

        apiData.data.results.map(vg =>{
            allGamesApi.push({
                id:vg.id,
                name: vg.name,
                description: vg.slug,
                img: vg.background_image,
                genres: vg.genres.map(g => g.name),
                released:vg.released,
                rating:vg.rating,
                platforms: vg.platforms.map(p => p.platform.name)
            })
        })
    }

    return allGamesApi
}

async function getAllDataDB() {
    const allGamesDB = await Videogame.findAll({
        include: Genre
    })

    return allGamesDB
}


async function getAllData() {
    const dataApi = await getAllDataApi()
    const dataDB = await getAllDataDB()

    const allData = [...dataApi, ...dataDB]
    return allData
}

// async function getData(name) {

//     if(name){

//         const apiData = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)

//         const apiGamesByName = apiData.data.results.map(g => {
//             return{
//                 id:g.id,
//                 name:g.name,
//                 background_image:g.background_image,
//                 rating:g.rating,
//                 genres:g.genres.map(g=> g.name)
//             }
//         })

//         const DBGamesByName = Videogame.filter(vg => vg.name.includes(name))

//         const GamesByName = [...DBGamesByName, ...apiGamesByName.splice(0, 15)]
//         return GamesByName 

//     }else {

//         const allGamesApi = []
    
//         for(let i=1; i<=5; i++){
//             let apiData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`,{
//                 headers:{
//                     'Accept-Encoding': 'null'
//                 }
//             });
    
//             apiData.data.results.map(vg =>{
//                 allGamesApi.push({
//                     id:vg.id,
//                     name: vg.name,
//                     description: vg.slug,
//                     img: vg.background_image,
//                     genres: vg.genres.map(g => g.name),
//                     released:vg.released,
//                     rating:vg.rating,
//                     platforms: vg.platforms.map(p => p.platform.name)
//                 })
//             })
//         }
        
//         const allGamesDB = await Videogame.findAll({
//             include:Genre
//         })
//         const allGames = [...allGamesDB, ...allGamesApi]
        
//         return allGames
//     }
    
// }

module.exports = getAllData;