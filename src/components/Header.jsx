import { AppBar, Toolbar, Avatar, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
    return (
        <AppBar position="fixed" color="primary" elevation={1}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo à esquerda */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h1>VALIDADOR</h1>
                </Box>

                {/* Opções no centro */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Link to="/">
                        <Typography variant='te'>
                            Validador
                        </Typography>
                    </Link>
                    <Link to="/dashboard">
                        <Typography variant='te'>
                            Dashboard
                        </Typography>
                    </Link>
                </Box>
                {/* Avatar do usuário à direita */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Usuário" sx={{cursor: 'pointer'}}>
                        <PersonIcon sx={{ fontSize: '2.5rem' }} />
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
