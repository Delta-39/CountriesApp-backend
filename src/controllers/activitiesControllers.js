//* Importación de modelos de Activity y Country desde el archivo db.js
const {
    Activity,
    Country
} = require('../db');

//* Importación del operador Sequelize "Op" para realizar consultas
const {
    Op
} = require('sequelize');

//* Controlador para obtener todas las actividades junto con los países relacionados
const getActivitiesController = async () => {
    //* Realiza una consulta a la base de datos para obtener todas las actividades
    const allActivities = await Activity.findAll({
        //* Incluye la relación con el modelo Country
        include: {
            model: Country,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    
    //* Retorna la lista de todas las actividades obtenidas
    return allActivities;
};

//* Controlador para crear una nueva actividad con países relacionados
const postActivitiesController = async (name, difficultyLevel, duration, seasonType, countryNames) => {
    //* Crea una nueva actividad en la base de datos
    const newActivity = await Activity.create({
        name,
        difficultyLevel,
        duration,
        seasonType
    });

    //* Si se proporcionan nombres de países y hay al menos uno
    if (countryNames && countryNames.length > 0) {
        //* Crea un arreglo de filtros para los nombres de los países
        const countryFilters = countryNames.map(name => ({
            name: {
                [Op.iLike]: `%${name}%`
            }
        }));

        //* Realiza una consulta a la base de datos para obtener los países que coinciden con los filtros
        const countries = await Country.findAll({
            where: {
                [Op.or]: countryFilters
            }
        });

        //* Asocia los países encontrados a la nueva actividad
        await newActivity.addCountries(countries);
    }

    //* Retorna la nueva actividad creada con países relacionados
    return newActivity;
};

//* Exportación de los controladores para su uso en otras partes de la aplicación
module.exports = {
    getActivitiesController,
    postActivitiesController
};