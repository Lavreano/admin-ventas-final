import Sale from "../models/saleModel.js";

async function createSale(req, res) {
    try {

        const { userId, products, totalAmount, paymentMethod, cashReceived } = req.body;

        // Validaciones
        if (!userId || !products || products.length === 0 || !totalAmount || !paymentMethod) {
            return res.status(400).json({ message: "Faltan datos obligatorios." });
        }

        let change = 0;
        if (paymentMethod === "Efectivo") {
            if (!cashReceived || isNaN(cashReceived) || cashReceived < totalAmount) {
                return res.status(400).json({ message: "El monto ingresado es insuficiente." });
            }
            change = cashReceived - totalAmount;
        }

        // Crear nueva venta
        const newSale = new Sale({
            userId,
            products,
            totalAmount,
            paymentMethod,
            cashReceived: paymentMethod === "Efectivo" ? cashReceived : null,
            change: paymentMethod === "Efectivo" ? change : null,
        });

        await newSale.save();
        res.status(201).json({ message: "Compra registrada con éxito.", sale: newSale });

    } catch (error) {
        console.error(" Error al registrar la venta:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
}

async function getSale(req, res) {
    try {
        const sales = await Sale.find()
            .populate("userId", "name email") 
            .populate("products", "name price");

        res.status(200).json({ message: "Ok", data: sales });

    } catch (error) {
        console.error(" Error al obtener ventas:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
}

async function getSaleById(req, res) {
    try {
        const id = req.params.id;
        const sale = await Sale.findById(id)
            .populate("userId", "name email")
            .populate("products", "name price");

        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        res.status(200).json({ message: "Ok", data: sale });

    } catch (error) {
        console.error("Error al obtener la venta:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
}

export { createSale, getSale, getSaleById };
