import React, { useState, useEffect } from "react";
import FormProducts from "../components/FormProducts";
import { useMensaje } from "../contexts/MensajeContext";
import ModalConfirm from "../components/ModalConfirm";

function TablaProductos() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mostrarMensaje } = useMensaje();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlProducts = "http://localhost:5000/products";
                const response = await fetch(urlProducts);
                if (!response.ok) {
                    throw new Error("Hubo un problema al obtener los datos.");
                }
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error("[Fetch-Api] Hubo un problema al obtener los datos:", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleDeleteProduct = async (productId) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const confirmDeleteProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${selectedProductId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Hubo un problema al eliminar el producto.");
            }
            mostrarMensaje("success", "¡El producto se eliminó con éxito!");

            const updatedProducts = products.filter((product) => product._id !== selectedProductId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            mostrarMensaje("error", "Ups! Hubo un error al querer eliminar el producto");
        } finally {
            setIsModalOpen(false);
            setSelectedProductId(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Productos</h1>

            <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {/* Tabla de productos */}
                <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Lista de Productos</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-4 text-left">Producto</th>
                                    <th className="py-3 px-4 text-left">Precio</th>
                                    <th className="py-3 px-4 text-left">Código</th>
                                    <th className="py-3 px-4 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product._id} className="border-t hover:bg-gray-50 transition">
                                            <td className="py-3 px-4">{product.name}</td>
                                            <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                                            <td className="py-3 px-4">{product.plu}</td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center"
                                                >
                                                     Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-4 text-center text-gray-500">
                                            No hay productos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Formulario de productos */}
                <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <div className="bg-white p-4 rounded-lg">
                        <FormProducts />
                    </div>
                </div>
            </div>

            {/* Modal de confirmación */}
            <ModalConfirm
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDeleteProduct}
                productName={products.find((product) => product._id === selectedProductId)?.name}
            />
        </div>
    );
}

export default TablaProductos;
