import {
    AppBar,
    Toolbar,
    Avatar,
    Box,
    Typography,
    Popover,
    Button,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/validate.png';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { user, logout } = useAuth();

    const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'G';

    const navigate = useNavigate();

    const handleAvatarClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleMobileMenuClick = (event) => { setMobileMenuAnchor(event.currentTarget); };

    const handleClose = () => { setAnchorEl(null); };
    const handleMobileMenuClose = () => { setMobileMenuAnchor(null); };

    const open = Boolean(anchorEl);
    const mobileMenuOpen = Boolean(mobileMenuAnchor);

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

                    {/* Opções no centro (desktop) ou menu hamburger (mobile) */}
                    {!isMobile ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Link to="/">
                                <Typography variant="link">Validador</Typography>
                            </Link>
                            <Link to="/dashboard">
                                <Typography variant="link">Dashboard</Typography>
                            </Link>
                        </Box>
                    ) : (
                        <Box>
                            <IconButton
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMobileMenuClick}
                            >
                                <MenuIcon sx={{fontSize: '2rem'}}/>
                            </IconButton>
                        </Box>
                    )}

                    {/* Avatar à direita (apenas desktop) */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ cursor: 'pointer' }} onClick={handleAvatarClick}>
                                {userInitial}
                            </Avatar>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Popover do Avatar (apenas desktop) */}
            {!isMobile && (
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
            )}

            {/* Menu mobile */}
            <Menu
                anchorEl={mobileMenuAnchor}
                open={mobileMenuOpen}
                onClose={handleMobileMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    component={Link}
                    to="/"
                    onClick={handleMobileMenuClose}
                >
                    Validador
                </MenuItem>
                <MenuItem
                    component={Link}
                    to="/dashboard"
                    onClick={handleMobileMenuClose}
                >
                    Dashboard
                </MenuItem>
                <MenuItem
                    component={Link}
                    to="/perfil"
                    onClick={handleMobileMenuClose}
                >
                    Perfil
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleMobileMenuClose();
                        logout();
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default Header;