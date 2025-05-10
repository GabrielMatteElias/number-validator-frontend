import { Box, Card, CardContent, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import Graphics from './components/Graphics';
import { useEffect, useState } from 'react';
import { useApi } from '../../services/useApi';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [numeros, setNumeros] = useState({
        total: 0,
        validos: 0,
        invalidos: 0,
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { getUserDashboard } = useApi();

    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserDashboard();

            if (response.status_code === 200) {

                setNumeros({
                    ...numeros,
                    total: response.status_res.total_usado_validacao,
                    validos: response.status_res.total_whatsapp_validos,
                    invalidos: response.status_res.total_whatsapp_invalidos,
                });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    const pieData = {
        labels: ['Válidos', 'Inválidos'],
        datasets: [
            {
                data: [numeros.validos, numeros.invalidos],
                backgroundColor: ['#10B981', '#EF4444'],
                hoverBackgroundColor: ['#059669', '#DC2626'],
            },
        ],
    };

    const months = ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'];

    const monthAbbreviations = {
        'Abril': 'Abr',
        'Maio': 'Mai',
        'Junho': 'Jun',
        'Julho': 'Jul',
        'Agosto': 'Ago',
        'Setembro': 'Set'
    };

    const monthLabels = isMobile
        ? months.map(month => monthAbbreviations[month] || month.substring(0, 3))
        : months;

    const barData = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Válidos',
                backgroundColor: '#10B981',
                hoverBackgroundColor: '#059669',
                data: [2000, 3000, 2600, 4800, 950, 1850],
            },
            {
                label: 'Inválidos',
                backgroundColor: '#EF4444',
                hoverBackgroundColor: '#DC2626',
                data: [500, 800, 1100, 2000, 2500, 1700],
            },
        ],
    };

    if (!user) return null;

    return (
        <>
            <SEO
                title="ValidaWhats - Dashboard"
                description="Visualize o total de números validados e analise com gráficos dinâmicos e dados atualizados."
                url='https://validaWhats.com/dashboard'
            />
            <Box p={isSmallMobile ? 2 : 4}>
                <Typography variant={isMobile ? "h5" : "h6"} fontWeight="bold" sx={{ fontWeight: 600, fontSize: '2rem', marginBottom: '1rem' }}>
                    Dashboard de Validações
                </Typography>
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid>
                                <Grid container direction="column" spacing={2}>
                                    <Grid>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant={isMobile ? "subtitle1" : "h6"} color="textSecondary">
                                                    Total de Números
                                                </Typography>
                                                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                                                    {numeros.total.toLocaleString('pt-BR')}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant={isMobile ? "subtitle1" : "h6"} color="textSecondary">
                                                    Números Válidos
                                                </Typography>
                                                <Typography
                                                    variant={isMobile ? "h5" : "h4"}
                                                    fontWeight="bold"
                                                    color="success.main"
                                                >
                                                    {numeros.validos.toLocaleString('pt-BR')}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant={isMobile ? "subtitle1" : "h6"} color="textSecondary">
                                                    Números Inválidos
                                                </Typography>
                                                <Typography
                                                    variant={isMobile ? "h5" : "h4"}
                                                    fontWeight="bold"
                                                    color="error.main"
                                                >
                                                    {numeros.invalidos.toLocaleString('pt-BR')}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid>
                                <Graphics
                                    largura={'100%'}
                                    altura={isMobile ? '200px' : '250px'}
                                    chartData={pieData}
                                    chartType={1}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography
                            variant={isMobile ? "subtitle1" : "h6"}
                            color="textSecondary"
                            mb={1}
                        >
                            Validações por Mês
                        </Typography>
                        <Graphics
                            chartData={barData}
                            chartType={2}
                            largura="100%"
                            altura={isMobile ? '200px' : '250px'}
                        />
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Dashboard;