const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genre', {
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      }
    },{
      timestamps:false,
    });
  };
  
// [ ] Genero con las siguientes propiedades:
// ID
// Nombre