import { AppBar, Toolbar, Avatar, Box, Typography, Popover, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../assets/validate.png';
import profilePicture from '../assets/profile-picture.png'
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const { user, logout } = useAuth();

    const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'G';

    const navigate = useNavigate();

    const handleAvatarClick = (event) => { setAnchorEl(event.currentTarget); };

    const handleClose = () => { setAnchorEl(null); };

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
                        <Avatar sx={{ cursor: 'pointer' }} onClick={handleAvatarClick}>
                            {userInitial}
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
                            color: '#000',
                            fontWeight: 400,
                            '&:hover': {
                                color: 'text.secondary',
                            },
                        }}
                    >
                        Perfil
                    </Button>

                    <Button
                        onClick={logout}
                        sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            transition: 'color 0.3s',
                            color: '#000',
                            fontWeight: 400,
                            '&:hover': {
                                color: 'text.secondary',
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
