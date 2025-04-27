import { AppBar, Toolbar, Avatar, Box, Typography, Popover, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../assets/validate.png';
import profilePicture from '../assets/profile-picture.png'

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        handleClose();
        navigate('/login');
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <AppBar position="fixed" color="primary" elevation={1}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo à esquerda */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/">
                            <img src={logo} alt="Logo da Empresa" width={150} />
                        </Link>
                    </Box>

                    {/* Opções no centro */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Link to="/">
                            <Typography variant="link">Validador</Typography>
                        </Link>
                        <Link to="/dashboard">
                            <Typography variant="link">Dashboard</Typography>
                        </Link>
                    </Box>

                    {/* Avatar à direita */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        
                        <Avatar
                            alt="Usuário"
                            sx={{ cursor: 'pointer' }}
                            onClick={handleAvatarClick}
                            src={profilePicture}
                        >
                            <PersonIcon sx={{ fontSize: '3rem' }} />
                        </Avatar>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Popover do Avatar */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    mt: 1,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, minWidth: 150 }}>
                    <Button
                        component={Link}
                        to="/perfil"
                        onClick={handleClose}
                        sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            transition: 'all 0.3s',
                            '&:hover': {
                                color: 'primary.hover',
                            },
                        }}
                    >
                        Perfil
                    </Button>

                    <Button
                        onClick={handleLogout}
                        sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            transition: 'color 0.3s',
                            '&:hover': {
                                color: 'primary.hover',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

export default Header;
