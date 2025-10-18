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
import { useEffect, useState, useMemo } from 'react'; // Adicionei useMemo
import { useApi } from '../../services/useApi';
import ValidationPackage from '../../components/ValidationPackage';

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

    const progresso = () => {
        if (userProfile?.total_validacao > 0) {
            return userProfile.total_usado_validacao / userProfile.total_validacao * 100;
        }
        return 0;
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
                        <Typography variant="subtitle1" className={styles.subtitle} >
                            Validações utilizadas
                        </Typography>

                        <Box className={styles.numbersContainer}>
                            <Box>
                                <Typography variant="h5" className={styles.numbersAvailable}>
                                    {userProfile.total_usado_validacao?.toLocaleString() || 0}
                                </Typography>
                                <Typography variant="body1" className={styles.numbersTotal}>
                                    de {userProfile.total_validacao?.toLocaleString()}
                                </Typography>
                            </Box>
                            <Chip
                                label={`${Math.round(progresso())}% utilizado`}
                                size="medium"
                                className={styles.usageChip}
                                color={progresso() > 75 ? 'warning' : 'primary'}
                            />
                        </Box>

                        <LinearProgress
                            variant="determinate"
                            value={progresso()}
                            className={styles.progressBar}
                            color={progresso() > 80 ? 'warning' : 'primary'}
                        />
                    </CardContent>
                </Card>

                <ValidationPackage />                
            </Box>
        </>
    );
};

export default Profile;