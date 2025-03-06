// Modelo de Usuarios
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    shift: String,
    email: { type: String, unique: true },
    password: String
})

const User = mongoose.model('User', userSchema);

export default User