import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Páginas
import Validator from '../pages/validator/Validator';
//import NotFound from '../pages/NotFound';

//Layout
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import ProtectedRoute from './PrivateRoutes';
import Register from '../pages/login/register/Register';
import Profile from '../pages/profile/Profile.jsx';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Layout geral */}
                <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                    {/* Rotas internas */}
                    <Route index element={<Validator />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/perfil' element={<Profile />} />
                </Route>

                {/* Rotas inválidas */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
