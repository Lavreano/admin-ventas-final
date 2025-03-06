import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentModal = ({ totalAmount, products, closeModal }) => {
  const [userId, setUserId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Transferencia");
  const [cashReceived, setCashReceived] = useState(0);
  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para la notificación

  const extractUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        console.warn("No hay token en localStorage");
        return null;
      }

      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        console.error("Token inválido, no es un JWT:", token);
        return null;
      }

      const base64Payload = tokenParts[1];
      const decodedPayload = atob(base64Payload);
      const payload = JSON.parse(decodedPayload);

      console.log("Payload del token:", payload);
      return payload.userId || payload.sub || payload.id || null;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };

  useEffect(() => {
    const extractedUserId = extractUserIdFromToken();
    if (extractedUserId) {
      setUserId(extractedUserId);
      console.log("userId extraído:", extractedUserId);
    } else {
      console.warn("No se pudo extraer userId del token");
    }
  }, []);

  const handleCashChange = (e) => {
    const receivedAmount = parseFloat(e.target.value) || 0;
    setCashReceived(receivedAmount);
    setChange(receivedAmount - totalAmount);
  };

  const handlePayment = async () => {
    setError("");

    console.log("🔍 userId enviado:", userId);

    if (!userId) {
      setError("Error: No hay usuario asociado a la compra.");
      return;
    }

    const saleData = {
      userId,
      products: products.map((p) => p._id),
      totalAmount,
      paymentMethod,
      cashReceived: paymentMethod === "Efectivo" ? cashReceived : null,
    };

    console.log("Enviando datos al backend:", JSON.stringify(saleData, null, 2));

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/sales/create", saleData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Compra registrada con éxito:", response.data);

      // Mostrar mensaje de éxito
      setSuccessMessage("✅ ¡Pago realizado con éxito!");
      setTimeout(() => {
        closeModal();
      }, 3000); // Cierra el modal después de 3 segundos

    } catch (error) {
      console.error("Error al procesar el pago:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Hubo un error al registrar la venta.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6 relative animate-fadeIn">
        {/* Botón de cerrar */}
        <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg" onClick={closeModal}>
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-700 text-center">Resumen de Pago</h2>
        <p className="text-lg font-medium text-gray-900 mt-2 text-center">Total: ${totalAmount.toFixed(2)}</p>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mt-4 rounded">
            {successMessage}
          </div>
        )}

        {!successMessage && (
          <>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Método de pago:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta de crédito/débito</option>
                <option value="Efectivo">Efectivo</option>
              </select>
            </div>

            {paymentMethod === "Efectivo" && (
              <div className="mt-4">
                <label className="block text-gray-700 font-medium">Monto entregado:</label>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={handleCashChange}
                  min={totalAmount}
                  className="w-full mt-1 p-2 border rounded-lg"
                />
                <p className="text-gray-700 mt-1">Vuelto: <strong>${change.toFixed(2)}</strong></p>
              </div>
            )}

            {error && <p className="text-red-500 mt-3 text-sm text-center">{error}</p>}

            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-all"
              >
                {loading ? "Procesando..." : "Confirmar Pago"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
