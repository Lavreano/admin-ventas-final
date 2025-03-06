import { useAuth } from "../contexts/AuthContext";
import { useNavigate} from "react-router-dom";
import { useMensaje } from '../contexts/MensajeContext'; 

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { mostrarMensaje } = useMensaje();

    const handleLogout = () =>{
        logout();
        navigate('/login');
        mostrarMensaje('success', `¡Sesión Cerrada, te esperamos pronto!`);
    }

    return(
        <button onClick={handleLogout}>Cerrar Sesión</button>
    )
};

export default Logout;