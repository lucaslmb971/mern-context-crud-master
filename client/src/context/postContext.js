import { createContext, useContext, useEffect, useState } from "react";
import {
  getPostsRequest,
  deletePostRequest,
  createPostRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/posts"; // Importa las funciones de solicitud API para interactuar con posts

// Crea el contexto postContext
const postContext = createContext();

// Hook personalizado `usePosts` para consumir el contexto
export const usePosts = () => {
  const context = useContext(postContext);
  if (!context) throw new Error("Post Provider is missing");
  return context;
};

// Componente `PostProvider` que envuelve a sus hijos con el contexto
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // Estado local para almacenar posts

  // useEffect para cargar los posts al montar el componente
  useEffect(() => {
    (async () => {
      try {
        const res = await getPostsRequest(); // Realiza la solicitud para obtener todos los posts
        setPosts(res.data); // Actualiza el estado local con los posts obtenidos
      } catch (error) {
        console.error(error);
      }
    })();
  }, []); // El segundo argumento vacío [] asegura que se ejecute solo una vez al montar

  // Función para eliminar un post por su ID
  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id); // Realiza la solicitud para eliminar el post
      if (res.status === 204) { // Si la eliminación es exitosa (estatus 204)
        setPosts(posts.filter((post) => post._id !== id)); // Actualiza el estado removiendo el post eliminado
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para crear un nuevo post
  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post); // Realiza la solicitud para crear un nuevo post
      setPosts([...posts, res.data]); // Actualiza el estado añadiendo el nuevo post creado
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener un post por su ID
  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id); // Realiza la solicitud para obtener un post por su ID
      return res.data; // Retorna los datos del post obtenido
    } catch (error) {
      console.error(error);
    }
  };

  // Función para actualizar un post por su ID.
  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post); // Realiza la solicitud para actualizar un post
      setPosts(posts.map((p) => (p._id === id ? res.data : p))); // Actualiza el estado con el post actualizado
    } catch (error) {
      console.error(error);
    }
  };

  // Renderiza el contexto `postContext.Provider` con las funciones y estado actualizados
  return (
    <postContext.Provider
      value={{ posts, deletePost, createPost, getPost, updatePost }}
    >
      {children} {/* Renderiza los hijos envueltos dentro del contexto */}
    </postContext.Provider>
  );
};
