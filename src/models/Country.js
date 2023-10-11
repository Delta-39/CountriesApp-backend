const {
  DataTypes
} = require('sequelize');

//* Exportamos una función que define el modelo 'Country'
module.exports = (sequelize) => {
  //* Definición del modelo 'Country'
  sequelize.define('Country', {
    //* Columna 'id' como clave primaria de longitud 3
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    //* Columna 'name' como texto no nulo
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //* Columna 'flag' como texto no nulo
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //* Columna 'continents' como enumeración con validación
    continents: {
      type: DataTypes.ENUM('North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania', 'Antarctica'),
      allowNull: false,
      validate: {
        isIn: ['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania', 'Antarctica']
      }
    },
    //* Columna 'capital' como texto nullable
    capital: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //* Columna 'subregion' como texto
    subregion: {
      type: DataTypes.STRING,
    },
    //* Columna 'area' como número de punto flotante
    area: {
      type: DataTypes.FLOAT
    },
    //* Columna 'population' como número entero no nulo
    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false //* Desactiva las marcas de tiempo automáticas
  });
};