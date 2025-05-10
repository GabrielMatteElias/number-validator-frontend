import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

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
                                        <img src='/assets/validate.webp' alt="ValidaWhats - Validação de contatos de WhatsApp" width="150" height="36" loading="lazy"/>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
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