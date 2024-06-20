import toast from "react-hot-toast"; // Importa la función toast de react-hot-toast
import { usePosts } from "../context/postContext"; // Importa el hook usePosts del contexto postContext
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate de react-router-dom

export function PostCard({ post }) {
  const { deletePost } = usePosts(); // Obtiene la función deletePost del contexto postContext
  const navigate = useNavigate(); // Obtiene la función navigate del hook useNavigate

  // Función para manejar la eliminación de un post
  const handleDelete = (id) => {
    // Muestra un toast personalizado para confirmar la eliminación del post
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Do you want to delete <strong>{id}</strong>?
          </p>
          <div>
            {/* Botón para confirmar la eliminación */}
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={(e) => {
                deletePost(id); // Llama a la función deletePost con el ID del post
                toast.dismiss(t.id); // Cierra el toast después de eliminar el post
              }}
            >
              Delete
            </button>
            {/* Botón para cancelar la eliminación */}
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)} // Cierra el toast al cancelar
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: "4000", // Duración del toast en milisegundos
        style: {
          background: "#202020" // Estilo de fondo del toast
        }
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/${post._id}`)} // Navega a la página del post al hacer clic en el contenedor
    >
      <div className="px-4 py-7">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold">{post.title}</h3>
          {/* Botón para eliminar el post */}
          <button
            className="bg-red-600 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation(); // Evita la propagación del evento para no navegar al hacer clic en el botón
              handleDelete(post._id); // Llama a handleDelete con el ID del post al hacer clic en el botón
            }}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-400">{post.description}</p>
      </div>
      {/* Muestra la imagen del post si está disponible */}
      {post.image && <img src={post.image.url} alt={post.title} />}
    </div>
  );
}
