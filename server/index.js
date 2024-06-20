// Importa el objeto `app` desde el archivo "app.js"
import { app } from "./app.js";

// Importa la funcion `connectDB` desde el archivo "db.js"
import { connectDB } from "./db.js";

// Importa la constante `PORT` desde el archivo "config.js"
import { PORT } from "./config.js";

// Llama a la funcion `connectDB` para establecer la conexion con la base de datos
connectDB();

// Inicia el servidor y lo configura para que escuche en el puerto especificado por `PORT`
app.listen(PORT);

// Imprime en la consola un mensaje indicando en que puerto esta escuchando el servidor
console.log("Server on port", PORT);
