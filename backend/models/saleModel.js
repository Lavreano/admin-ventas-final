import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con el usuario
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }], // Productos comprados
    totalAmount: { type: Number, required: true }, // Monto total de la venta
    paymentMethod: { type: String, enum: ["Transferencia", "Tarjeta", "Efectivo"], required: true }, // Método de pago
    cashReceived: { type: Number }, // Monto recibido (solo si es efectivo)
    change: { type: Number }, // Vuelto calculado (solo si es efectivo)
    date: { type: Date, default: Date.now } // Fecha de la venta
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
