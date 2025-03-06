import Payments from "../models/paymentsModel.js";
const errorName = 'Revisar el campo nombre';

async function createPayments(request, response){
    try {
        const payments = request.body;

        if( payments.name.trim() == ''){
            response.status(400).json({ message: errorName, data: []});
        } else {
            const newPayments = new Payments(request.body);
            await newPayments.save();
            response.status(200).json({ message: 'Ok', newPayments});
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error, data: []});
    }
}

async function getPayments( request, response){
    try {
        const payments = await Payments.find()
        response.status(200).json({message: 'Ok', data: payments});

    } catch (error) {
        console.error(error);
        response.status(500).json({message: error, data: []});
    }
}

async function getPaymentsById( request, response){
    try {
        const id = request.params.id;
        const payments = await Payments.findById(id);
        response.status(200).json({message: 'Ok', data: payments});

    } catch (error) {
        console.error(error);
        response.status(500).json({message: error, data: []});
    }
}

export { createPayments, getPayments, getPaymentsById}