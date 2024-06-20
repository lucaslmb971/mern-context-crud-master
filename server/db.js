// Importa el módulo `mongoose` para trabajar con MongoDB en Node.js
import mongoose from "mongoose";

// Importa la constante `MONGODB_URI` desde el archivo "config.js"
import { MONGODB_URI } from "./config.js";

// Exporta una función asincrónica llamada `connectDB` para conectar a la base de datos
export const connectDB = async () => {
  try {
    // Intenta conectar a la base de datos usando la URI proporcionada en `MONGODB_URI`
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    // Si hay un error durante la conexión, se imprime en la consola
    console.error(error);
  }
};

// Configura un evento que se activa cuando la conexión con la base de datos es exitosa
mongoose.connection.on("connected", () => {
  // Imprime en la consola un mensaje indicando que MongoDB está conectado
  // e incluye el nombre de la base de datos conectada
  console.log("Mongodb is connected to", mongoose.connection.db.databaseName);
});
