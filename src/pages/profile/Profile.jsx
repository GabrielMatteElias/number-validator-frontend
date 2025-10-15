import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import styles from './Profile.module.css';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../../services/useApi';

const Profile = () => {
    const [userProfile, setUserProfile] = useState({})

    const { user } = useAuth();
    const { getUserData } = useApi();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserData();

            if (response.status_code === 200) {

                setUserProfile(response.status_res)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    const usuario = {
        nome: 'João da Silva',
        email: 'joao@email.com',
        planoAtual: { quantidade: 1000, usados: 800 }
    };

    const pacotes = [
        { id: 1, quantidade: 1000, preco: 30 },
        { id: 2, quantidade: 2500, preco: 50, recomendado: true },
        { id: 3, quantidade: 5000, preco: 90 },
        { id: 4, quantidade: 10000, preco: 150 },
    ];

    const progresso = (total, used) => {
        return used / total * 100;
    }

    if (!user) return null;

    return (
        <>
            <SEO
                title="Meu Perfil - ValidaWhats"
                description="Gerencie seu perfil, veja seu saldo de números e adquira novos pacotes de validação."
                url="https://seusite.com/perfil"
            />
            <Box className={styles.container}>
                <Card className={styles.card}>
                    <CardContent>
                        {/* User info section */}
                        <Box className={styles.userInfo}>
                            <Typography variant="h6" className={styles.userName}>{userProfile.nome}</Typography>
                            <Typography variant="body2" className={styles.userEmail}>{userProfile.email}</Typography>
                        </Box>

                        {/* Numbers available section */}
                        <Typography variant="subtitle1" >
                            Números disponíveis
                        </Typography>

                        <Box className={styles.numbersContainer}>
                            <Box>
                                <Typography variant="h5" className={styles.numbersAvailable}>
                                    {`${userProfile.total_usado_validacao} `}
                                </Typography>
                                <Typography variant="body1" className={styles.numbersTotal}>
                                    de {userProfile.total_validacao}
                                </Typography>
                            </Box>
                            <Chip
                                label={`${Math.round(progresso(userProfile.total_validacao, userProfile.total_usado_validacao))}% utilizado`}
                                size="medium"
                                className={styles.usageChip}
                                color={progresso > 75 ? 'warning' : 'primary'}
                            />
                        </Box>

                        {/* Progress bar */}
                        <Tooltip title={`${usuario.planoAtual.usados} números utilizados`} arrow>
                            <LinearProgress
                                variant="determinate"
                                value={progresso(userProfile.total_validacao, userProfile.total_usado_validacao)}
                                className={styles.progressBar}
                                color={progresso > 80 ? 'warning' : 'primary'}
                            />
                        </Tooltip>
                    </CardContent>
                </Card>

                {/* Pacotes Disponíveis */}
                <Box className={styles.pacotesContainer}>
                    {pacotes.map(pacote => (
                        <Card
                            key={pacote.id}
                            className={`${styles.pacoteCard} ${pacote.recomendado ? styles.recomendado : ''}`}
                        >
                            <CardContent sx={{ textAlign: 'center' }}>
                                {pacote.recomendado && (
                                    <Typography variant="caption" color="primary" className={styles.recomendadoBadge}>
                                        RECOMENDADO
                                    </Typography>
                                )}
                                <Typography variant="h6">
                                    {pacote.quantidade.toLocaleString()} números
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    R${pacote.preco}
                                </Typography>
                                <Button variant="contained" size="small" fullWidth>
                                    Comprar
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </>

    );
};

export default Profile;
