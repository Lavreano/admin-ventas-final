// Modelo de Método de Pago
import mongoose from "mongoose";

const paymentsSchema = new mongoose.Schema({
    name: String,
    value: Number
})

const Payments = mongoose.model('Payments', paymentsSchema);

export default Payments