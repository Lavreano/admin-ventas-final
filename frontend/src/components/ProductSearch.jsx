import React, { useState, useEffect } from "react";
import PaymentModal from "./PaymentModal"; // Importamos el modal

const ProductSearch = ({ userId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.data);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts([]);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const handleProductClick = (product) => {
        const index = selectedProducts.findIndex((p) => p._id === product._id);

        if (index === -1) {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        } else {
            const updatedProducts = [...selectedProducts];
            updatedProducts[index].quantity++;
            setSelectedProducts(updatedProducts);
        }
        setTotalPrice((prevTotal) => prevTotal + product.price);
    };

    const handleDeleteProduct = (product) => {
        const index = selectedProducts.findIndex((p) => p._id === product._id);

        if (selectedProducts[index].quantity === 1) {
            const updatedProducts = selectedProducts.filter((p) => p._id !== product._id);
            setSelectedProducts(updatedProducts);
        } else {
            const updatedProducts = [...selectedProducts];
            updatedProducts[index].quantity--;
            setSelectedProducts(updatedProducts);
        }
        setTotalPrice((prevTotal) => prevTotal - product.price);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Administrador de Ventas</h2>

            {/* Buscador */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Lista de productos */}
            <div className="max-w-4xl mx-auto mt-6">
                <ul className="bg-white shadow-lg rounded-lg divide-y">
                    {filteredProducts.map((product) => (
                        <li key={product._id} className="flex justify-between p-4 hover:bg-gray-50">
                            <span className="text-gray-700">{product.name}</span>
                            <button
                                onClick={() => handleProductClick(product)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Agregar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tabla de productos seleccionados */}
            <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Productos Seleccionados</h3>
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left">Producto</th>
                            <th className="py-2 px-4">Cantidad</th>
                            <th className="py-2 px-4">Precio Unitario</th>
                            <th className="py-2 px-4">Precio Total</th>
                            <th className="py-2 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProducts.map((product) => (
                            <tr key={product._id} className="border-t">
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4">{product.quantity}</td>
                                <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                                <td className="py-2 px-4">${(product.price * product.quantity).toFixed(2)}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDeleteProduct(product)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Barra de total y botón de pago */}
            {totalPrice > 0 && (
                <div className="fixed bottom-0 left-0 right-0 text-white flex justify-between items-center py-4 px-8 shadow-lg dark:bg-gray-900">
                    <h3 className="text-lg font-bold">Total: ${totalPrice.toLocaleString()}</h3>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Pagar
                    </button>
                </div>
            )}

            {/* Modal de pago */}
            {showModal && (
                <PaymentModal
                    totalAmount={totalPrice}
                    products={selectedProducts}
                    userId={userId}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ProductSearch;
