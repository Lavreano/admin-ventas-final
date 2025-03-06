import jwt from "jsonwebtoken";
const secretKey = 'Users';

const autenticar = async( req, res, next) => {
    const token = req.headers.authorization;

    if( !token){
        return res.status(401).json({ message: 'No se paso el JWT', data: []});
    }

    // Verifico el jwt
    jwt.verify(token, secretKey, (error, decoded) =>{
        if( error){
            return res.status(403).json({ message: 'JWT Invalido ', data: []});
        }

        req.body.userId = decoded.id;
        next();
    })

    console.log(jwt);
}

export { autenticar }