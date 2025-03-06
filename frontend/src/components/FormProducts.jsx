import { useState } from "react";
import { useMensaje } from "../contexts/MensajeContext";

const FormProducts = () => {
    const { mostrarMensaje } = useMensaje();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        plu: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "El nombre es requerido";
        }
        if (!formData.price.trim()) {
            errors.price = "El precio es requerido";
        } else if (isNaN(Number(formData.price))) {
            errors.price = "El precio debe ser un número válido";
        }
        if (!formData.plu.trim()) {
            errors.plu = "El código es requerido";
        } else if (isNaN(Number(formData.plu))) {
            errors.plu = "El código debe ser un número válido";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const endPoint = "http://localhost:5000/products";
            const response = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const json = await response.json();
            console.log(json);
            mostrarMensaje("success", `¡El producto "${formData.name}" se agregó con éxito!`);

            setFormData({
                name: "",
                price: "",
                plu: ""
            });

            setErrors({});

        } catch (error) {
            console.error(error);
            mostrarMensaje("error", "Hubo un error al agregar el producto");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Nombre del Producto</label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ej: Laptop HP"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="price">Precio</label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={formData.price}
                        onChange={handleChange}
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Ej: 1299.99"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="plu">Código</label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={formData.plu}
                        onChange={handleChange}
                        type="text"
                        name="plu"
                        id="plu"
                        placeholder="Ej: 123456"
                    />
                    {errors.plu && <p className="text-red-500 text-sm mt-1">{errors.plu}</p>}
                </div>

                <button type="submit"
                    className="w-full flex justify-center items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-semibold rounded-lg text-md px-5 py-3 transition-all">
                    Agregar Producto
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default FormProducts;
