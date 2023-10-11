//* Importación de controladores de actividades desde el archivo activitiesControllers.js
const {
    getActivitiesController,
    postActivitiesController
} = require('../controllers/activitiesControllers');

//* Controlador para obtener todas las actividades
const getActivitiesHandler = async (req, res) => {
    try {
        //* Llamada al controlador para obtener las actividades
        const activities = await getActivitiesController();
        res.status(200).json(activities);
    } catch (error) {
        //* En caso de error, se envía un error 500 con el mensaje del error
        res.status(500).json({
            error: error.message
        });
    }
};

//* Controlador para crear una nueva actividad
const postActivitiesHandler = async (req, res) => {
    try {
        //* Extracción de datos del cuerpo de la solicitud
        const {
            name,
            difficultyLevel,
            duration,
            seasonType,
            countryNames
        } = req.body;

        //* Validación de campos obligatorios
        if (!name || !difficultyLevel || !seasonType || !countryNames || countryNames.length === 0) {
            return res.status(400).json({
                error: 'Incomplete mandatory fields'
            });
        } else {
            //* Llamada al controlador para crear una nueva actividad
            const newActivity = await postActivitiesController(name, difficultyLevel, duration, seasonType, countryNames);
            res.status(200).json(newActivity);
        }
    } catch (error) {
        //* En caso de error, se envía un error 500 con el mensaje del error
        res.status(500).json({
            error: error.message
        });
    }
};

//* Exportación de los controladores para su uso en otras partes de la aplicación
module.exports = {
    getActivitiesHandler,
    postActivitiesHandler
};