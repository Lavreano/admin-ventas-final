import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si hay un token guardado y recuperar el usuario
        const token = localStorage.getItem("jwt");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser)); // Recuperar el usuario guardado
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        if (!token) {
            console.error("Error: No hay token recibido en login.");
            return;
        }
    
        localStorage.setItem("jwt", token); // Guarda el token correctamente
        console.log("Token almacenado en localStorage:", token);
    
        try {
            const tokenParts = token.split(".");
            const payload = JSON.parse(atob(tokenParts[1])); // Decodifica el payload del token
            console.log("Payload del token:", payload);
    
            setUser({ userId: payload.id, email: payload.email }); // uarda usuario en el estado global
            setIsAuthenticated(true);
        } catch (error) {
            console.error(" Error al decodificar el token:", error);
        }
    };
    

    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
