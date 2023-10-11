const { Router } = require("express");
const databaseSync = require("../controllers/dataBaseSync");
const countriesRouter = require("./countriesRouter");
const activitiesRouter = require("./activitiesRouter");

//* Crea un enrutador principal utilizando el objeto 'Router' de Express
const mainRouter = Router();

//* Ruta para sincronizar la base de datos con los datos externos
mainRouter.get('/sync-data', databaseSync);

//* Utiliza el enrutador de países definido en 'countriesRouter'
mainRouter.use('/countries', countriesRouter);

//* Utiliza el enrutador de actividades definido en 'activitiesRouter'
mainRouter.use('/activities', activitiesRouter);

//* Exporta el enrutador principal para que pueda ser utilizado en otros archivos
module.exports = mainRouter;