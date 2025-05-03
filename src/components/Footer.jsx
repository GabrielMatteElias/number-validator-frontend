import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { Email, Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import logo from '../assets/validate.png'; // Reutilizando o mesmo logo do header

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.dark',
                color: 'white',
                py: 4,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3
                }}>
                    {/* Logo e descrição */}
                    <Box sx={{ maxWidth: 300 }}>
                        <img src={logo} alt="ValidaWhats" width={150} />
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            ValidaWhats - Solução completa para validação de números de WhatsApp
                        </Typography>
                    </Box>

                    {/* Links rápidos */}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Links Rápidos
                        </Typography>
                        <Link href="/" color="inherit" underline="hover" sx={{ mb: 1 }}>
                            Validador
                        </Link>
                        <Link href="/dashboard" color="inherit" underline="hover" sx={{ mb: 1 }}>
                            Dashboard
                        </Link>
                        <Link href="/perfil" color="inherit" underline="hover">
                            Meu Perfil
                        </Link>
                    </Box>

                    {/* Contato */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Contato
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Email sx={{ mr: 1 }} />
                            <Typography>contato@validawhats.com</Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.2)' }} />

                {/* Rodapé inferior */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} ValidaWhats. Todos os direitos reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;