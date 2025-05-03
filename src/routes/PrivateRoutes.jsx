// src/components/PrivateRoute.js
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;
    return true ? children : <Navigate to="/login" />;
}