import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Páginas
import Validator from '../pages/validator/Validator';
//import NotFound from '../pages/NotFound';

//Layout
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Layout geral */}
                <Route path="/" element={<MainLayout />}>
                    {/* Rotas internas */}
                    <Route index element={<Validator />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>

                {/* Rotas inválidas */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
