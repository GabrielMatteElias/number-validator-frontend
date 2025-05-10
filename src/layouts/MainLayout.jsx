import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'
import styles from './MainLayout.module.css';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <Box className={styles.layoutContainer}>
            <Header />

            <Container className={styles.mainContent} maxWidth="lg" sx={{marginTop: '6.4rem'}}>
                <Outlet />
            </Container>

            <Footer />
        </Box>
    );
};

export default MainLayout;
