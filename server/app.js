// Importa el módulo `express` para crear una aplicación web en Node.js
import express from "express";

// Importa el módulo `morgan` para el registro de solicitudes HTTP
import morgan from "morgan";

// Importa el middleware `express-fileupload` para manejar la carga de archivos
import fileUpload from "express-fileupload";

// Importa el módulo `path` para trabajar con rutas de archivos y directorios
import path from 'path';

// Importa la función `dirname` desde el módulo `path`
import { dirname } from 'path';

// Importa la función `fileURLToPath` desde el módulo `url`
import { fileURLToPath } from 'url';

// Importa las rutas definidas en `posts.routes.js`
import postRoutes from "./routes/posts.routes.js";

// Crea una aplicación de Express
const app = express();

// Obtiene el directorio actual del archivo en ejecución
const __dirname = dirname(fileURLToPath(import.meta.url));

// Usa `morgan` con el modo "dev" para registrar las solicitudes HTTP en la consola
app.use(morgan("dev"));

// Usa el middleware de Express para parsear las solicitudes JSON
app.use(express.json());

// Usa el middleware de Express para parsear solicitudes URL-encoded
app.use(express.urlencoded({ extended: false }));

// Configura el middleware `express-fileupload` para manejar la carga de archivos
app.use(
  fileUpload({
    tempFileDir: "./upload", // Directorio temporal para archivos subidos
    useTempFiles: true, // Usa archivos temporales en lugar de almacenarlos en memoria
  })
);

// Configura el middleware de Express para servir archivos estáticos desde un directorio
app.use(express.static(path.join(__dirname, '../client/build')));

// Configura las rutas de la aplicación
app.use("/api", postRoutes);

// Exporta la aplicación de Express para que pueda ser utilizada en otros módulos
export { app };
