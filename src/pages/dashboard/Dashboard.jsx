import { Box, Card, CardContent, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import Graphics from './components/Graphics';
import { useEffect } from 'react';
import { useApi } from '../../services/useApi';

const Dashboard = () => {
    const totalNumeros = 23800;
    const numerosValidos = 15200;
    const numerosInvalidos = 8600;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { getUserDashboard } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            // const response = await getUserDashboard();
            // console.log('Dados do Dashboard:', response);
        };
        fetchData();
    }, []);

    const pieData = {
        labels: ['Válidos', 'Inválidos'],
        datasets: [
            {
                data: [numerosValidos, numerosInvalidos],
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

    return (
        <Box p={isSmallMobile ? 2 : 4}>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" mb={2}>
                Dashboard de Validações
            </Typography>

            {/* Primeiro Card - Estatísticas e Gráfico de Pizza */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        {/* Cards de Estatísticas */}
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant={isMobile ? "subtitle1" : "h6"} color="textSecondary">
                                                Total de Números
                                            </Typography>
                                            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                                                {totalNumeros.toLocaleString('pt-BR')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
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
                                                {numerosValidos.toLocaleString('pt-BR')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
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
                                                {numerosInvalidos.toLocaleString('pt-BR')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Gráfico de Pizza */}
                        <Grid item xs={12} md={8}>
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

            {/* Segundo Card - Gráfico de Barras */}
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
    );
};

export default Dashboard;