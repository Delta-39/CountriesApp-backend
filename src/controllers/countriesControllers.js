//* Importación de modelos de Country y Activity desde el archivo db.js
const {
    Country,
    Activity
} = require('../db');

//* Importación del operador Sequelize "Op" para realizar consultas
const {
    Op
} = require('sequelize');

//* Controlador para obtener todos los países junto con sus actividades
const getAllCountriesController = async () => {
    //* Realiza una consulta a la base de datos para obtener todos los países
    const countries = await Country.findAll({
        //* Incluye la relación con el modelo Activity
        include: {
            model: Activity,
            attributes: ['id', 'name'],
            through: {
                attributes: []
            }
        }
    });
    
    //* Muestra los países en la consola (para fines de depuración)
    console.log(countries);
    
    //* Retorna la lista de países obtenida
    return countries;
};

//* Controlador para obtener países por nombre (con actividades relacionadas)
const getCountryByNameController = async (name) => {
    //* Realiza una consulta a la base de datos para buscar países por nombre
    let countryFoundbyName = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}%`
            },
        },
        //* Incluye la relación con el modelo Activity
        include: Activity
    });
    
    //* Si no se encuentran países, retorna null
    if (countryFoundbyName.length === 0) {
        return null; 
    }
    
    //* Retorna la lista de países encontrados por nombre
    return countryFoundbyName;
};

//* Controlador para obtener un país por su ID (con actividades relacionadas)
const getCountryByIdController = async (id) => {
    //* Convierte el ID a mayúsculas
    const uppercaseId = id.toUpperCase();
    
    //* Realiza una consulta a la base de datos para buscar un país por ID
    const country = await Country.findOne({
        where: {
            id: {
                [Op.startsWith]: uppercaseId,
            },
        },
        //* Incluye la relación con el modelo Activity
        include: Activity
    });
    
    //* Retorna el país encontrado por ID
    return country;
};

//* Exportación de los controladores para su uso en otras partes de la aplicación
module.exports = {
    getAllCountriesController,
    getCountryByNameController,
    getCountryByIdController
};
