import { Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage, PostForm } from "./pages"; // Importa los componentes de las páginas
import { PostProvider } from "./context/postContext"; // Importa el contexto PostProvider
import { Toaster } from "react-hot-toast"; // Importa el componente Toaster de react-hot-toast para notificaciones

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center"> {/* Contenedor principal con estilos de fondo y alineación */}
      <div className="px-10 container m-auto py-4"> {/* Contenedor centralizado con padding */}
        <PostProvider> {/* Proveedor de contexto PostProvider para los componentes hijos */}
          <Routes> {/* Componente de enrutamiento de React Router */}
            {/* Ruta para la página de inicio */}
            <Route path="/" element={<HomePage />} />
            
            {/* Ruta para el formulario de creación de un nuevo post */}
            <Route path="/new" element={<PostForm />} />
            
            {/* Ruta dinámica para editar un post existente */}
            <Route path="/:id" element={<PostForm />} />
            
            {/* Ruta para manejar cualquier otra ruta no definida */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
          {/* Componente Toaster para mostrar notificaciones */}
          <Toaster />
        </PostProvider>
      </div>
    </div>
  );
}

export default App;
