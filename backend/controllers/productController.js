import Product from "../models/productModel.js";
const errorName = 'Revisar el campo nombre';

async function createProduct(request, response){
    try {
        const product = request.body;

        if( product.name.trim() == ''){
            response.status(400).json({ message: errorName, data: []});
        } else {
            const newProduct = new Product(request.body);
            await newProduct.save();
            response.status(200).json({ message: 'Ok', newProduct});
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error, data: []});
    }
}

async function getProducts( request, response){
    try {
        const products = await Product.find()
        response.status(200).json({message: 'Ok', data: products});

    } catch (error) {
        console.error(error);
        response.status(500).json({message: error, data: []});
    }
}

async function getProductsById(request, response){
    try {
        const id = request.params.id;
        const products = await Product.findById(id);
        response.status(200).json({message: 'Ok', data: products});

    } catch (error) {
        console.error(error);
        response.status(500).json({message: error, data: []});
    }
}

async function deleteProduct(request, response){
    try {
        const id = request.params.id;
        const products = await Product.findByIdAndDelete(id);
        response.status(200).json({message: 'Se eliminó con éxito', data: products});
    } catch (error) {
        console.error(error);
        response.status(500).json({message: '[Error-DeleteId]', Data: []});
    }
}

export { createProduct, getProducts, getProductsById, deleteProduct}