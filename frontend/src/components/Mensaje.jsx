import React from 'react';

const Mensaje = ({ tipo, texto }) => {
    const styles = {
        success: 'bg-green-500',
        error: 'bg-red-500',
    };

    return (
        <div className={`fixed bottom-0 right-0 mb-4 mr-4 p-4 rounded text-white ${styles[tipo]}`}>
            {texto}
        </div>
    );
};

export default Mensaje;

