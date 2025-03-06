import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


async function createUser(req, res) {
    try {
        const { name, lastname, shift, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            lastname: lastname,
            shift: shift,
            email: email,
            password: passwordHash
        });

        await newUser.save();
        res.status(200).json({ newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: [] });
    }
}

async function getUser(request, response) {
    try {
        const users = await User.find()
        response.status(200).json({ message: 'Ok', data: users });

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error, data: [] });
    }
}

async function getUserById(request, response) {
    try {
        const id = request.params.id;
        const users = await User.findById(id);
        response.status(200).json({ message: 'Ok', data: users });

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error, data: [] });
    }
}
const secretKey = 'Users';

// Aplicar para el final //
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado: falta token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Acceso no autorizado: token inválido' });
        }
        req.user = decoded.user; 
        next();
    });
};

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
};

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'El usuario no existe', data: [] });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'La contraseña es inválida', data: [] });
        }
        const token = generateToken(user);

        // Enviar token en la respuesta
        res.status(200).json({ message: 'Inicio de sesión exitoso', data: {token: token} });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: [] });
    }
}


export { createUser, getUser, getUserById, login}