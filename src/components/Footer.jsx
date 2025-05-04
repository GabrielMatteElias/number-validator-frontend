import { Box, Container, Typography, Link, Divider, Stack } from '@mui/material';
import { Email } from '@mui/icons-material';
import logo from '../assets/validate.png';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.main',
                color: 'common.white',
                py: 4,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{xs: 'start-flex', md: 'row'}}
                    spacing={4}
                    sx={{ mb: 3 }}
                    paddingLeft={{ xs: '10rem', md: '0' }}                    
                >
                    <Box sx={{ maxWidth: 300 }}>
                        <img src={logo} alt="ValidaWhats" width={150} />
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            ValidaWhats - Solução completa para validação de números de WhatsApp
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Links Rápidos
                        </Typography>
                        <Stack
                            direction={{ xs: 'row', sm: 'column' }}
                            spacing={{ xs: 2, sm: 1 }}
                            flexWrap="wrap"
                        >
                            <Link href="/" color="inherit" underline="hover">
                                Validador
                            </Link>
                            <Link href="/dashboard" color="inherit" underline="hover">
                                Dashboard
                            </Link>
                            <Link href="/perfil" color="inherit" underline="hover">
                                Perfil
                            </Link>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Contato
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Email fontSize="small" />
                            <Typography variant="body2">contato@validawhats.com</Typography>
                        </Stack>
                    </Box>
                </Stack>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 3 }} />

                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} ValidaWhats. Todos os direitos reservados.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;