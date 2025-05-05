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
    useTheme,
    Container
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
                <Container maxWidth="lg">

                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* Logo à esquerda */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/">
                                <picture>
                                    <img src='/assets/validate.webp' alt="ValidaWhats - Validação de contatos de WhatsApp" width="150" height="36" loading="lazy" />
                                </picture>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg>                                </IconButton>
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
                </Container>
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