// Importa el módulo `Router` de `express` para crear un nuevo enrutador
import { Router } from "express";

// Importa las funciones de los controladores para manejar las solicitudes
import {
  getPost,
  createPost,
  updatePost,
  removePost,
  getPosts,
} from "../controllers/posts.controllers.js";

// Crea una nueva instancia del enrutador
const router = Router();

// Define una ruta para obtener todos los posts
// Responde a solicitudes GET en la ruta "/posts"
router.get("/posts", getPosts);

// Define una ruta para obtener un post específico por su ID
// Responde a solicitudes GET en la ruta "/posts/:id"
router.get("/posts/:id", getPost);

// Define una ruta para crear un nuevo post
// Responde a solicitudes POST en la ruta "/posts"
router.post("/posts", createPost);

// Define una ruta para actualizar un post existente por su ID
// Responde a solicitudes PUT en la ruta "/posts/:id"
router.put("/posts/:id", updatePost);

// Define una ruta para eliminar un post por su ID
// Responde a solicitudes DELETE en la ruta "/posts/:id"
router.delete("/posts/:id", removePost);

// Exporta el enrutador para que pueda ser utilizado en otros módulos
export default router;
