//* Importación de controladores de países desde el archivo countriesControllers.js
const {
    getAllCountriesController,
    getCountryByNameController,
    getCountryByIdController
} = require('../controllers/countriesControllers.js');

//* Controlador para obtener países según el nombre proporcionado en el parámetro de consulta
const getCountriesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            //* Si no se proporciona un nombre, se obtienen todos los países
            const allCountries = await getAllCountriesController();
            res.status(200).json(allCountries);
        } else {
            //* Si se proporciona un nombre, se busca el país por ese nombre
            const countryByName = await getCountryByNameController(name);
            if (countryByName) {
                //* Si se encuentra el país, se devuelve en la respuesta
                res.status(200).json(countryByName);
            } else {
                //* Si no se encuentra el país, se envía un error 400 con un mensaje
                res.status(400).json({ error: 'Country not found.' });
            }
        }
    } catch (error) {
        //* Si ocurre un error durante el proceso, se envía un error 500 con el mensaje del error
        res.status(500).json({ error: error.message });
    }
};

//* Controlador para obtener un país por su ID
const getCountryByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        //* Se busca el país por su ID utilizando el controlador correspondiente
        const countryById = await getCountryByIdController(id);
        res.status(200).json(countryById);
    } catch (error) {
        //* Si ocurre un error durante el proceso, se envía un error 500 con el mensaje del error
        res.status(500).json({ error: error.message });
    }
};

//* Exportación de los controladores para su uso en otras partes de la aplicación
module.exports = {
    getCountriesHandler,
    getCountryByIdHandler
};