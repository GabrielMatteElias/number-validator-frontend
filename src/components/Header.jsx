import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import styles from './Header.module.css';


import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { user, logout } = useAuth();

    const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'G';

    const handleAvatarClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleMobileMenuClick = (event) => { setMobileMenuAnchor(event.currentTarget); };

    const handleClose = () => { setAnchorEl(null); };
    const handleMobileMenuClose = () => { setMobileMenuAnchor(null); };

    const open = Boolean(anchorEl);
    const mobileMenuOpen = Boolean(mobileMenuAnchor);

    const location = useLocation();
    const isHomepage = location.pathname === '/';

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
                        {isMobile &&
                            <Box>
                                <IconButton
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleMobileMenuClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg>                                </IconButton>
                            </Box>
                        }

                        {/* Avatar à direita (apenas desktop) */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {user ? (
                                    <Avatar sx={{ cursor: 'pointer' }} onClick={handleAvatarClick}>
                                        {userInitial}
                                    </Avatar>
                                ) : (
                                    <>
                                        <Button
                                            component={Link}
                                            to="/login"
                                            variant="text"
                                            sx={{ textTransform: 'none', color: '#fff' }}
                                        >
                                            Entrar
                                        </Button>
                                        <Button
                                            component={Link}
                                            to="/cadastro"
                                            variant="outlined"
                                            sx={{ textTransform: 'none', color: '#fff' }}
                                        >
                                            Cadastrar-se
                                        </Button>
                                    </>
                                )}
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
                    <Box className={styles.popoverMenu}>
                        <Button component={Link} to="/validador" onClick={handleClose} className={styles.menuButton}>
                            Validador
                        </Button>
                        <Button component={Link} to="/dashboard" onClick={handleClose} className={styles.menuButton}>
                            Dashboard
                        </Button>
                        <Button component={Link} to="/perfil" onClick={handleClose} className={styles.menuButton}>
                            Perfil
                        </Button>
                        <Button component={Link} to="/perfil/alterar-senha" onClick={handleClose} className={styles.menuButton}>
                            Alterar senha
                        </Button>
                        <Button onClick={logout} className={styles.menuButton}>
                            Sair
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
                {user
                    ? [
                        <MenuItem
                            key="validador"
                            component={Link}
                            to="/validador"
                            onClick={handleMobileMenuClose}
                        >
                            Validador
                        </MenuItem>,
                        <MenuItem
                            key="dashboard"
                            component={Link}
                            to="/dashboard"
                            onClick={handleMobileMenuClose}
                        >
                            Dashboard
                        </MenuItem>,
                        <MenuItem
                            key="perfil"
                            component={Link}
                            to="/perfil"
                            onClick={handleMobileMenuClose}
                        >
                            Perfil
                        </MenuItem>,
                        <MenuItem
                            key="seguranca"
                            component={Link}
                            to="/perfil/alterar-senha"
                            onClick={handleMobileMenuClose}
                        >
                            Alterar senha
                        </MenuItem>,
                        <MenuItem
                            key="logout"
                            onClick={() => {
                                handleMobileMenuClose();
                                logout();
                            }}
                        >
                            Sair
                        </MenuItem>,
                    ]
                    : [
                        <MenuItem
                            key="login"
                            component={Link}
                            to="/login"
                            onClick={handleMobileMenuClose}
                        >
                            Entrar
                        </MenuItem>,
                        <MenuItem
                            key="cadastro"
                            component={Link}
                            to="/cadastro"
                            onClick={handleMobileMenuClose}
                        >
                            Cadastrar-se
                        </MenuItem>,
                    ]}
            </Menu>

        </>
    );
};

export default Header;