import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MensajeProvider } from './contexts/MensajeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AdminVentas from './pages/AdminVentas';
import Productos from './pages/Productos';
import Login from './pages/Login';
import Registro from './pages/Registro';

import './App.css';

function App() {
    return (

        <MensajeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                    <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProtectedRoute element={<Productos />} />} />
                        <Route path="/admin" element={<ProtectedRoute element={<AdminVentas />} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registro />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </MensajeProvider>
    );
}

export default App;
