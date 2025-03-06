import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {routerAPI}  from "./routes/index.js";

const app = express();
const port = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true, useUnifiedTopology: true}  )

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.status(200).send('<h1> CRUD de Productos & Usuarios </h1>');
})

routerAPI(app);

app.listen( 5000, () =>{
    console.log('Servidor escuchando en el puerto ' + port);
})