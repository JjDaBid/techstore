import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">404 - Página no encontrada</h1>
      <p className="text-lg text-gray-600 mb-8">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">Volver a la página principal</Link>
    </div>
  );
};

export default NotFound;
