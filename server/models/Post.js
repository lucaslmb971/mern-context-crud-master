// Importa el módulo `mongoose` para trabajar con MongoDB en Node.js
import mongoose from "mongoose";

// Define el esquema para la colección de posts
const postSchema = new mongoose.Schema(
  {
    // Campo `title` del post
    title: {
      type: String, // El tipo de dato es String
      required: true, // Este campo es obligatorio
      trim: true, // Elimina espacios en blanco al inicio y al final del valor
    },
    // Campo `description` del post
    description: {
      type: String, // El tipo de dato es String
      required: true, // Este campo es obligatorio
      trim: true, // Elimina espacios en blanco al inicio y al final del valor
    },
    // Campo `image` del post, que contiene un objeto con `public_id` y `url`
    image: {
      public_id: String, // El ID público de la imagen
      url: String, // La URL de la imagen
    },
  },
  {
    // Configuración adicional para el esquema
    timestamps: true, // Añade campos `createdAt` y `updatedAt` automáticamente
    versionKey: false, // Desactiva la clave de versión `__v`
  }
);

// Exporta el modelo `Post` basado en el esquema `postSchema`
export default mongoose.model("Post", postSchema);
