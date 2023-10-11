const axios = require("axios");
const server = require("./src/server"); //* Importa la instancia del servidor Express
const { conn } = require('./src/db.js'); //* Importa la conexión a la base de datos
const PORT = 3001; //* Puerto en el que el servidor escuchará

//* Sincroniza la base de datos utilizando el método `sync` con la opción `alter: true`
//* Esto permite que las tablas se adapten a los cambios en los modelos sin eliminar datos existentes
conn.sync({ alter: true }).then(() => {

  //* Una vez que la base de datos esté sincronizada, el servidor comienza a escuchar en el puerto especificado
  
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error)); //* Captura y muestra cualquier error en la sincronización
