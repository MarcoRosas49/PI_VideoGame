const { DataTypes, UUIDV4, BOOLEAN } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released_date:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    rating:{
      type: DataTypes.FLOAT,
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.TEXT,
    },
    createdInDB:{
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{
    timestamps:false,
  });
};


// [ ] Videojuego con las siguientes propiedades:
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *

