const { Router } = require("express");
const { getActivitiesHandler, postActivitiesHandler } = require("../handlers/activitiesHandlers");

//* Crea un enrutador específico para las rutas relacionadas con actividades
const activitiesRouter = Router();

//* Define una ruta GET para obtener todas las actividades
activitiesRouter.get('/', getActivitiesHandler);

//* Define una ruta POST para crear una nueva actividad
activitiesRouter.post('/', postActivitiesHandler);

//* Exporta el enrutador de actividades para que pueda ser utilizado en otros archivos
module.exports = activitiesRouter;
