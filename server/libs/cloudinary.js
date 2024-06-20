// Importa el módulo `cloudinary` y utiliza la versión 2 (v2) del mismo
import { v2 as cloudinary } from "cloudinary";

// Importa las constantes `API_KEY`, `API_SECRET`, y `CLOUD_NAME` desde el archivo de configuración
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config.js";

// Configura `cloudinary` con las credenciales y el nombre del cloud
cloudinary.config({
  cloud_name: CLOUD_NAME, // Nombre del cloud de Cloudinary
  api_key: API_KEY,       // Clave API de Cloudinary
  api_secret: API_SECRET, // Secreto API de Cloudinary
});

// Exporta una función asincrónica para subir imágenes a Cloudinary
export const uploadImage = async (filePath) => {
  // Sube la imagen especificada por `filePath` al folder "posts" en Cloudinary
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts", // Carpeta en Cloudinary donde se almacenará la imagen
  });
};

// Exporta una función asincrónica para eliminar imágenes de Cloudinary
export const deleteImage = async (id) => {
  // Elimina la imagen especificada por el `id` en Cloudinary
  return await cloudinary.uploader.destroy(id);
};
