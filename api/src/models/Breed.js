const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_men: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight_may: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height_men: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_may: {
      type: DataTypes.STRING,
      allowNull: false, //puede ser true porque solo tiene un parametro
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    timestamps: false,
  });
};
