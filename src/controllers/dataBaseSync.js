//* Importación de la librería axios para hacer solicitudes HTTP
const axios = require('axios');

//* URL de la API externa de la cual se obtendrán los datos de países
const URL = 'http://localhost:5000/countries';

//* Importación del modelo Country desde el archivo db.js
const {
    Country
} = require('../db');

//* Controlador para sincronizar la base de datos local con los datos de la API externa
const databaseSync = async (req, res) => {
    try {
        //* Realiza una solicitud GET a la API externa para obtener los datos de países
        const response = await axios.get(URL);
        const countries = response.data;

        //* Mapea los datos de países obtenidos para ajustarlos al formato del modelo
        const countryData = countries.map(country => ({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.svg,
            continents: Array.isArray(country.continents) ? country.continents.join(',') : country.continents,
            capital: Array.isArray(country.capital) ? country.capital.join(',') : country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
        }));

        //* Realiza una inserción masiva de los datos de países en la base de datos local
        await Country.bulkCreate(countryData);

        //* Retorna los datos de países que fueron sincronizados y almacenados en la base de datos
        res.status(200).json(countryData);
    } catch (error) {
        //* Si ocurre un error durante el proceso, se envía una respuesta con el mensaje de error
        res.status(500).json({
            error: error.message
        });
    }
};

//* Exportación del controlador para su uso en otras partes de la aplicación
module.exports = databaseSync;