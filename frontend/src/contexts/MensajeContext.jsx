import React, { createContext, useContext, useState } from 'react';

const MensajeContext = createContext();

export const useMensaje = () => useContext(MensajeContext);

export const MensajeProvider = ({ children }) => {
    const [mensaje, setMensaje] = useState(null);

    const mostrarMensaje = (tipo, texto) => {
        setMensaje({ tipo, texto });
        setTimeout(() => {
            setMensaje(null);
        }, 5000);
    };

    return (
        <MensajeContext.Provider value={{ mostrarMensaje }}>
            {children}
            {mensaje && (
                <div className={`fixed bottom-4 right-4 p-4 rounded text-white ${mensaje.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {mensaje.texto}
                </div>
            )}
        </MensajeContext.Provider>
    );
};
