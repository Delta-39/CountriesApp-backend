//* Importación del módulo DataTypes desde sequelize para definir tipos de datos
const {
    DataTypes
} = require('sequelize');

//* Definición del modelo Activity en la base de datos
module.exports = (sequelize) => {
    sequelize.define('Activity', {
        //* Definición de la columna 'id' como clave primaria autoincremental
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        //* Definición de la columna 'name' como texto no nulo con validación
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'The field "name" must be completed.'
                }
            }
        },
        //* Definición de la columna 'difficultyLevel' como número no nulo con validación
        difficultyLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: 'The difficulty must be at least 1'
                },
                max: {
                    args: [5],
                    msg: 'The maximum difficulty is 5'
                }
            }
        },
        //* Definición de la columna 'duration' como tipo de dato TIME
        duration: {
            type: DataTypes.TIME,
        },
        //* Definición de la columna 'seasonType' como enumeración con valor por defecto y validación
        seasonType: {
            type: DataTypes.ENUM('Verano', 'Primavera', 'Invierno', 'Otoño'),
            defaultValue: 'Verano',
            allowNull: false
        }
    }, {
        timestamps: false //* Desactiva las marcas de tiempo automáticas
    });
};
