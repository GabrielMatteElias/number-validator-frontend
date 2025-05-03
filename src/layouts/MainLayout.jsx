import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'
import styles from './MainLayout.module.css';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <Box className={styles.layoutContainer}>
            {/* Header */}
            <Header />

            {/* Conteúdo principal */}
            <Container className={styles.mainContent} maxWidth="lg" sx={{marginTop: '6.4rem'}}>
                <Outlet />
            </Container>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default MainLayout;
