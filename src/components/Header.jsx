import { AppBar, Toolbar, Avatar, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../assets/validate.png'

const Header = () => {
    return (
        <AppBar position="fixed" color="primary" elevation={1}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo à esquerda */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo da Empresa" width={150} />
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
