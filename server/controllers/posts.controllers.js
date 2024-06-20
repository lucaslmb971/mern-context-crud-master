// Importa las funciones `deleteImage` y `uploadImage` desde el archivo cloudinary.js
import { deleteImage, uploadImage } from "../libs/cloudinary.js";

// Importa el modelo `Post` desde el archivo Post.js
import Post from "../models/Post.js";

// Importa el módulo `fs-extra` para trabajar con el sistema de archivos
import fs from "fs-extra";

// Controlador para obtener todos los posts
export const getPosts = async (req, res) => {
  try {
    // Encuentra todos los posts en la base de datos
    const posts = await Post.find({});
    // Devuelve los posts en formato JSON
    return res.json(posts);
  } catch (error) {
    // Devuelve un error 500 si ocurre algún problema
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para crear un nuevo post
export const createPost = async (req, res) => {
  try {
    // Obtiene el título y la descripción del cuerpo de la solicitud
    const { title, description } = req.body;
    let image = null;

    // Si hay una imagen en los archivos de la solicitud, súbela a Cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      // Elimina el archivo temporal después de subirlo
      await fs.remove(req.files.image.tempFilePath);
      // Guarda la URL y el ID público de la imagen subida
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Crea un nuevo documento de Post con los datos proporcionados
    const newPost = new Post({ title, description, image });
    // Guarda el nuevo post en la base de datos
    await newPost.save();
    // Devuelve el nuevo post en formato JSON
    return res.json(newPost);
  } catch (error) {
    // Devuelve un error 500 si ocurre algún problema
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un post por su ID
export const getPost = async (req, res) => {
  try {
    // Obtiene el ID del post de los parámetros de la solicitud
    const { id } = req.params;
    // Encuentra el post por su ID en la base de datos
    const post = await Post.findById(id);
    // Si el post no existe, devuelve un estado 404
    if (!post) return res.sendStatus(404);
    // Devuelve el post en formato JSON
    return res.json(post);
  } catch (error) {
    // Devuelve un error 500 si ocurre algún problema
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un post por su ID
export const updatePost = async (req, res) => {
  try {
    // Obtiene el ID del post de los parámetros de la solicitud
    const { id } = req.params;

    // Si se sube una nueva imagen, súbela a Cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      // Elimina el archivo temporal después de subirlo
      await fs.remove(req.files.image.tempFilePath);
      // Añade la nueva imagen al cuerpo de la solicitud
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Actualiza el post con los datos proporcionados en el cuerpo de la solicitud
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true, // Devuelve el documento actualizado
      }
    );
    // Devuelve el post actualizado en formato JSON
    return res.json(updatedPost);
  } catch (error) {
    // Devuelve un error 500 si ocurre algún problema
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un post por su ID
export const removePost = async (req, res) => {
  try {
    // Obtiene el ID del post de los parámetros de la solicitud
    const { id } = req.params;
    // Encuentra y elimina el post por su ID en la base de datos
    const post = await Post.findByIdAndDelete(id);

    // Si el post tiene una imagen asociada, elimínala de Cloudinary
    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }

    // Si el post no existe, devuelve un estado 404
    if (!post) return res.sendStatus(404);
    // Devuelve un estado 204 indicando que la eliminación fue exitosa
    res.sendStatus(204);
  } catch (error) {
    // Devuelve un error 500 si ocurre algún problema
    return res.status(500).json({ message: error.message });
  }
};
