const express = require("express");
const router = require("./routes/mainRouter");
const morgan = require("morgan");
const cors = require("cors");

//* Crea una instancia del servidor Express
const server = express();

//* Configuración de middleware
server.use(morgan("dev")); //* Registra las solicitudes en la consola en formato "dev"
server.use(express.json()); //* Permite el análisis de solicitudes JSON
server.use(cors()); //* Habilita CORS para permitir peticiones desde otros dominios

//* Asocia el enrutador principal a las rutas del servidor
server.use(router);

//* Exporta la instancia del servidor para que pueda ser utilizada en otros archivos
module.exports = server;
