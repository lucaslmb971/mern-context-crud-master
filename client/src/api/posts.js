import axios from "axios"; // Importa Axios para realizar solicitudes HTTP

// Función para obtener todos los posts
export const getPostsRequest = async () => await axios.get("/api/posts");

// Función para obtener un post por su ID
export const getPostRequest = async (id) => await axios.get("/api/posts/" + id);

// Función para eliminar un post por su ID
export const deletePostRequest = async (id) =>
  await axios.delete("/api/posts/" + id);

// Función para crear un nuevo post
export const createPostRequest = async (post) => {
  const form = new FormData(); // Crea un nuevo objeto FormData para enviar datos multipart/form-data
  for (let key in post) {
    form.append(key, post[key]); // Agrega cada clave-valor del post al FormData
  }
  return await axios.post("/api/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data", // Especifica el tipo de contenido como multipart/form-data para el envío de archivos
    },
  });
};

// Función para actualizar un post por su ID con nuevos campos de post
export const updatePostRequest = async (id, newPostFields) => {
  const form = new FormData(); // Crea un nuevo objeto FormData para enviar datos multipart/form-data
  for (let key in newPostFields) {
    form.append(key, newPostFields[key]); // Agrega cada clave-valor de los nuevos campos del post al FormData
  }
  return axios.put("/api/posts/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data", // Especifica el tipo de contenido como multipart/form-data para el envío de archivos
    },
  });
};
