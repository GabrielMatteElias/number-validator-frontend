import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'
import styles from './MainLayout.module.css';

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
            <Box component="footer" className={styles.footer}>
                <Typography variant="body2" color="textSecondary" align="center">
                    © 2025 - Todos os direitos reservados
                </Typography>
            </Box>
        </Box>
    );
};

export default MainLayout;
