import { Box, Button, Container, Grid, Card, CardActions, CardContent, CardMedia, Paper, Typography, Divider } from "@mui/material";
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const Home = () => {

    const { user } = useAuth();

    const steps = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>,
            title: '1. Faça o Upload do Arquivo',
            description: 'Envie um arquivo (.csv) contendo a lista de números de telefone que você deseja validar. Simples e rápido!',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>,
            title: '2. Inicie a Validação',
            description: 'Com um clique, nossa plataforma processa seus números, verificando individualmente a existência de conta no WhatsApp.',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucideLightbulb-icon lucideLightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>,
            title: '3. Receba os Resultados',
            description: 'Visualize os resultados detalhados, identificando quais números são WhatsApp válidos e quais não são, prontos para sua estratégia.',
        },
    ];

    const benefits = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge-icon lucide-gauge"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>,
            title: 'Validação Rápida e Eficiente',
            description: 'Resultados em poucos minutos. Nossa plataforma é otimizada para processar grandes volumes com eficiência e precisão.',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>,
            title: 'Aumento da Taxa de Entrega',
            description: 'Envie mensagens apenas para números WhatsApp válidos, melhorando a entrega e o engajamento de suas campanhas.',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>,
            title: 'Redução de Custos',
            description: 'Economize recursos evitando o envio de mensagens para números inexistentes ou que não utilizam o WhatsApp.',
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /><path d="M19.364 18.364a9 9 0 0 0 0-12.728" /></svg>,
            title: 'Melhore Suas Campanhas',
            description: 'Segmente seu público de forma mais eficaz e direcione suas campanhas de marketing e comunicação para os contatos certos.',
        },
    ];

    const packages = [
        {
            title: 'Básico',
            price: 'R$ 24,90',
            validations: '1.000 validações',
            popular: false,
            buttonText: 'Começar Agora',
            buttonVariant: 'outlined',
        },
        {
            title: 'Pro',
            price: 'R$ 59,90',
            validations: '5.000 validações',
            popular: true,
            buttonText: 'Escolher Plano Pro',
            buttonVariant: 'contained',
        },
        {
            title: 'Empresarial',
            price: 'R$ 99,90',
            validations: '15.000 validações',
            popular: false,
            buttonText: 'Assinar Agora',
            buttonVariant: 'outlined',
        },
        {
            title: 'Personalizado',
            price: 'Sob consulta',
            validations: 'Quantidade flexível',
            popular: false,
            buttonText: 'Solicitar Orçamento',
            buttonVariant: 'contained',
            color: 'success',
            whatsappLink: 'https://wa.me/5551984287099?text=Olá! Gostaria de um plano personalizado com ____ validações.'
        }
    ];

    const WhatsAppIcon = () => (
        <svg width="17" height="24" viewBox="0 0 24 24">
            <path fill="#fff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );

    const isUserLoggedIn = user;

    const LoggedOutHero = (
        <Box mt={4}>
            <Button variant="contained" color="primary" size="large" className={styles.ctaButtonPrimary} href="#cadastro">
                Comece Agora - É Grátis!
            </Button>
            <Button variant="outlined" color="primary" size="large" className={styles.ctaButtonSecondary} sx={{ ml: 2 }} href="#como-funciona">
                Saiba Mais
            </Button>
        </Box>
    );

    const LoggedInHero = (
        <Box mt={4}>
            {/* CTA Principal: Iniciar a Ação Principal do Sistema */}
            <Button variant="contained" color="primary" size="large" className={styles.ctaButtonPrimary} component={Link} to='/validador'>
                Validar Novo Arquivo Agora
            </Button>
            {/* CTA Secundária: Verificar o Status/Consumo */}
            <Button variant="outlined" color="primary" size="large" className={styles.ctaButtonSecondary} sx={{ ml: 2 }} component={Link} to='/perfil'>
                Ver Meus Créditos e Histórico
            </Button>
        </Box>
    );

    return (
        <Box>
            <Box className={styles.heroBox}>
                <Container maxWidth="lg" >
                    <Grid spacing={4} alignItems="center">
                        <Grid className={styles.heroContent}>
                            <Typography variant="h2" component="h1" gutterBottom className={styles.heroTitle}>
                                Valide Números de WhatsApp de Forma Eficiente
                            </Typography>
                            <Typography variant="h5" component="p" gutterBottom className={styles.heroSubtitle}>
                                Otimize suas campanhas e contatos. Clique abaixo para iniciar uma nova validação ou gerenciar sua conta.
                            </Typography>
                            {isUserLoggedIn ? LoggedInHero : LoggedOutHero}

                        </Grid>
                        <Grid className={styles.heroImageContainer}>
                            {/* Você pode adicionar uma imagem ou ilustração aqui */}
                            <picture>
                                <img src='/assets/img-home.webp' alt="ValidaWhats - Validação de contatos de WhatsApp" loading="lazy" className={styles.heroImage} />
                            </picture>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Divider />
            <Box id="como-funciona" className={styles.howItWorksBox}>
                <Box maxWidth="lg">
                    <Typography variant="h3" component="h2" gutterBottom align="center" className={styles.sectionTitle}>
                        Como Funciona?
                    </Typography>
                    <Typography variant="h6" component="p" align="center" gutterBottom className={styles.sectionSubtitle}>
                        Validar seus números é um processo simples e intuitivo com o ValidaWhats.
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
                        {steps.map((step, index) => (
                            <Grid key={index} className={styles.stepGridItem}>
                                <Paper elevation={3} className={styles.stepPaper}>
                                    <Box className={styles.stepIconContainer}>
                                        {step.icon}
                                    </Box>
                                    <Typography variant="h5" component="h3" gutterBottom className={styles.stepTitle}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body1" className={styles.stepDescription}>
                                        {step.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Divider />

            <Box id="beneficios" className={styles.benefitsBox}>
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h2" gutterBottom align="center" className={styles.sectionTitle}>
                        Benefícios de Usar o ValidaWhats
                    </Typography>
                    <Typography variant="h6" component="p" align="center" gutterBottom className={styles.sectionSubtitle}>
                        Descubra como nossa ferramenta pode transformar sua comunicação e otimizar seus resultados.
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
                        {benefits.map((benefit, index) => (
                            <Grid key={index} className={styles.benefitGridItem}>
                                <Paper elevation={2} className={styles.benefitPaper}>
                                    <Box className={styles.benefitIconContainer}>
                                        {benefit.icon}
                                    </Box>
                                    <Typography variant="h6" component="h3" gutterBottom className={styles.benefitTitle}>
                                        {benefit.title}
                                    </Typography>
                                    <Typography variant="body2" className={styles.benefitDescription}>
                                        {benefit.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Divider />

            <Box id="pacotes" className={styles.packagesBox}>
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h2" gutterBottom align="center" className={styles.sectionTitle}>
                        Nossos Pacotes de Validação
                    </Typography>
                    <Typography variant="h6" component="p" align="center" gutterBottom className={styles.sectionSubtitle}>
                        Escolha o plano ideal para suas necessidades e comece a validar seus contatos hoje mesmo.
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center" alignItems="stretch">
                        {packages.map((pkg, index) => (
                            <Grid key={index} className={styles.packageGridItem}>
                                <Card className={`${styles.packageCard} ${pkg.popular ? styles.popularPackage : ''}`}>
                                    {pkg.popular && (
                                        <Box className={styles.popularBadge}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                                            Popular
                                        </Box>
                                    )}
                                    <CardContent className={styles.packageCardContent}>
                                        <Typography variant="h4" component="h3" gutterBottom className={styles.packageTitle}>
                                            {pkg.title}
                                        </Typography>
                                        <Typography variant="h3" component="p" className={styles.packagePrice} sx={{ color: pkg.title === 'Personalizado' ? '#5e35b1' : '#1976d2' }}>
                                            {pkg.price}
                                        </Typography>
                                        <Typography variant="subtitle1" component="p" gutterBottom className={styles.packageValidations}>
                                            {pkg.validations}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={styles.packageCardActions}>
                                        <Button
                                            startIcon={pkg.title === 'Personalizado' ? <WhatsAppIcon /> : ''}
                                            variant={pkg.buttonVariant}
                                            sx={{ backgroundColor: pkg.title === 'Personalizado' ? '#673ab7  ' : 'primary', '&:hover': { backgroundColor: pkg.title === 'Personalizado' ? '#5e35b1' : 'primary' } }}
                                            fullWidth
                                            className={styles.packageButton}
                                            target={pkg.whatsappLink ? "_blank" : ''}
                                            href={pkg.whatsappLink || "#cadastro"}>
                                            {pkg.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Divider />

            <Box id="cadastro-ou-recarga" className={styles.ctaBox}>
                <Container maxWidth="md">
                    <Paper elevation={6} className={styles.ctaPaper}>
                        {isUserLoggedIn ? (
                            <>
                                <Typography variant="h3" component="h2" gutterBottom align="center" className={styles.ctaTitle}>
                                    Precisa de Mais Validações?
                                </Typography>
                                <Typography variant="h6" component="p" align="center" gutterBottom className={styles.ctaSubtitle}>
                                    Seus créditos estão acabando. Recarregue agora e não interrompa suas campanhas.
                                </Typography>
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Link className={styles.ctaButton} to='/perfil'>
                                        Ver Planos e Recarregar
                                    </Link>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography variant="h3" component="h2" gutterBottom align="center" className={styles.ctaTitle}>
                                    Pronto para Otimizar Seus Contatos?
                                </Typography>
                                <Typography variant="h6" component="p" align="center" gutterBottom className={styles.ctaSubtitle}>
                                    Cadastre-se gratuitamente no ValidaWhats e comece a validar seus números de telefone agora mesmo. Descubra o poder da validação inteligente!
                                </Typography>
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Link variant="contained" color="secondary" size="large" className={styles.ctaButton} id="cadastro" to='/cadastro'>
                                        Criar Minha Conta Grátis
                                    </Link>
                                </Box>
                                <Typography variant="body1" align="center" sx={{ mt: 2, color: '#fff', fontSize: '1.1rem' }}>
                                    Já possui uma conta? {' '}
                                    <Link to="/login" className={styles.loginLinkOnCta}>
                                        Faça Login
                                    </Link>
                                </Typography>
                            </>
                        )}
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;