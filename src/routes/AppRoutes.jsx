import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { lazy, Suspense } from 'react';

//Páginas
const Validator = lazy(() => import('../pages/validator/Validator'));
const Home = lazy(() => import('../pages/home/Home.jsx'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Login = lazy(() => import('../pages/login/Login'));
const Register = lazy(() => import('../pages/login/register/Register'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const NotFound = lazy(() => import('../pages/notFound/NotFound'));

//Layout
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './PrivateRoutes';
import Loading from '../components/Loading.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import AlterarSenha from '../pages/alterarSenha/alterarSenha.jsx';

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <ErrorBoundary>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/cadastro" element={<Register />} />
                            {/* Layout geral */}
                            <Route path="/" element={<MainLayout />}>
                                {/* Home pública */}
                                <Route index element={<Home />} />
                                {/* Rotas protegidas */}
                                <Route path="validador" element={<ProtectedRoute><Validator /></ProtectedRoute>} />
                                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                <Route path="perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                <Route path="perfil/alterar-senha" element={<ProtectedRoute><AlterarSenha /></ProtectedRoute>} />
                            </Route>
                            {/* Rotas inválidas */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;