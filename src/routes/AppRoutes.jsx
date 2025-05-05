import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';

//Páginas
import Validator from '../pages/validator/Validator';
//import NotFound from '../pages/NotFound';

//Layout
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import ProtectedRoute from './PrivateRoutes';
import Register from '../pages/login/register/Register';
import Profile from '../pages/profile/Profile';

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />

                    {/* Layout geral */}
                    <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                        {/* Rotas internas */}
                        <Route index element={<Validator />} />
                        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path='/perfil' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    </Route>

                    {/* Rotas inválidas */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
