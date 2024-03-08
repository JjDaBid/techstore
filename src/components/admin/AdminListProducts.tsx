/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'


const AdminListProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getAllProducts().then(response => {
                setProducts(response.data);
                console.log("Estos son los datos: ", response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    const deleteProduct = async (id: string) => {

        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará el producto de forma permanente.',
                icon: 'warning',
                showCancelButton: true,
                color: 'black',
                confirmButtonText: 'Sí, eliminar',
                confirmButtonColor: '#FE001B',      
                cancelButtonText: 'Cancelar',
                customClass: {
                  container: 'custom-alert-container', // Clase personalizada para el contenedor de la alerta
                },
              });

              if (result.isConfirmed){
                ProductService.deleteProduct(id).then(response => {               
                setProducts(products.filter(product => product.id !== id));
                toast.success("Producto eliminado exitosamente");
                })
              }            
        } catch (error) {
            Swal.fire('Error', 'Ha ocurrido un error al eliminar el producto.', 'error');
        }
    };    

    return (
        <div className="container">
            <div className="mb-4">
                <Link to="/admin/add-products" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">Agregar Producto</Link>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black text-white">
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Stock</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="text-center">{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{formatPrice(product.price)}</td>
                            <td className="flex justify-center items-center">
                                <img src={product.url} alt={product.productName} className="w-20 h-20 object-contain"/>
                            </td>
                            <td className="text-center">
                                <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                                    {product.inStock ? "En stock" : "Sin stock"}
                                </div>
                            </td>
                            <td className="flex justify-center items-center gap-4">
                                <Link to={`/admin/edit-products/${product.id}`} className="text-blue-500 hover:text-blue-700">
                                    <FaEdit size={24}/>
                                </Link>
                                <button className="text-red-500 hover:text-red-700" onClick={() => deleteProduct(product.id)}>
                                    <FaTrashAlt size={24} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminListProducts;
