// Importa la función `config` del paquete `dotenv`
import { config } from "dotenv";

// Llama a la función `config` para cargar las variables de entorno desde un archivo .env
config();

// Exporta la constante `MONGODB_URI`
// Intenta obtener el valor de la variable de entorno `MONGODB_URI`
// Si no está definida, usa "mongodb://localhost/merndb" como valor por defecto
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/merndb";

// Exporta la constante `PORT`
// Intenta obtener el valor de la variable de entorno `PORT`
// Si no está definida, usa 4000 como valor por defecto
export const PORT = process.env.PORT || 4000;

// Exporta la constante `CLOUD_NAME`
// Obtiene el valor de la variable de entorno `CLOUD_NAME`
export const CLOUD_NAME = process.env.CLOUD_NAME;

// Exporta la constante `API_KEY`
// Obtiene el valor de la variable de entorno `API_KEY`
export const API_KEY = process.env.API_KEY;

// Exporta la constante `API_SECRET`
// Obtiene el valor de la variable de entorno `API_SECRET`
export const API_SECRET = process.env.API_SECRET;
