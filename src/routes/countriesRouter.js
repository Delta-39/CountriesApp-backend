const { Router } = require('express');
const { getCountriesHandler, getCountryByIdHandler } = require('../handlers/countriesHandlers');

//* Crea un enrutador específico para las rutas relacionadas con países
const countriesRouter = Router();

//* Define una ruta GET para obtener todos los países
countriesRouter.get('/', getCountriesHandler);

//* Define una ruta GET para obtener un país por su ID
countriesRouter.get('/:id', getCountryByIdHandler);

//* Exporta el enrutador de países para que pueda ser utilizado en otros archivos
module.exports = countriesRouter;
