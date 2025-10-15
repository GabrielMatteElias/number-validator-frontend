import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AlterarSenha.module.css';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';
// import { useApi } from '../../services/useApi';

// Função de validação de senha
const validatePassword = (password) => {
    const errors = [];
    
    // Requisito 1: Mínimo de 8 caracteres
    if (password.length < 8) {
        errors.push("Mínimo de 8 caracteres.");
    }
    
    // Requisito 2: Letra maiúscula
    if (!/[A-Z]/.test(password)) {
        errors.push("Conter letra maiúscula.");
    }
    
    // Requisito 3: Letra minúscula
    if (!/[a-z]/.test(password)) {
        errors.push("Conter letra minúscula.");
    }
    
    // Requisito 4: Caractere especial (pode ser ajustado conforme a sua regra exata)
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Conter caractere especial (ex: @, #, $).");
    }

    return errors;
};


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Estado para armazenar erros de validação do frontend para feedback imediato
    const [validationErrors, setValidationErrors] = useState([]);

    const { user } = useAuth();
    const navigate = useNavigate();
    // const { changePassword } = useApi();

    if (!user) {
        navigate('/login');
        return null;
    }
    
    // Função que é chamada ao mudar a nova senha para feedback em tempo real
    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        setValidationErrors(validatePassword(password));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const errors = validatePassword(newPassword);
        
        if (errors.length > 0) {
            // Se houver erros, exibe a primeira mensagem de erro no topo
            setError(`A nova senha não atende a todos os requisitos: ${errors[0]}`);
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError('A nova senha e a confirmação não coincidem.');
            return;
        }

        setTimeout(() => {
            setSuccess('Sua senha foi alterada com sucesso! Você será redirecionado.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setValidationErrors([]);
            setTimeout(() => navigate('/perfil'), 2000);
        }, 1000);
    };

    const newPasswordHelperText = validationErrors.length > 0 
        ? validationErrors.join(' | ') 
        : "Requisitos: 8+ caracteres, maiúscula, minúscula e especial.";
        
    const isSubmitDisabled = !currentPassword || newPassword.length === 0 || validationErrors.length > 0 || newPassword !== confirmNewPassword;

    return (
        <>
            <Box className={styles.container}>
                <Card className={styles.card}>
                    <CardContent>
                        <Typography component="h2" className={styles.formTitle} gutterBottom>
                            Alterar Senha
                        </Typography>
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="textSecondary" className={styles.formSubtitle} mb={1}>
                                Mantenha sua conta segura. A nova senha deve atender aos seguintes requisitos:
                            </Typography>
                            <Box component="ul" sx={{ listStyleType: 'disc', pl: 2, color: 'text.secondary', fontSize: '1.2rem' }}>
                                <li>No mínimo 8 caracteres.</li>
                                <li>Conter letras maiúsculas e minúsculas.</li>
                                <li>Conter pelo menos um caractere especial (ex: !, @, #, $).</li>
                            </Box>
                        </Box>

                        <Box component="form" className={styles.form} onSubmit={handleSubmit}>
                            <TextField
                                label="Senha Atual"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className={styles.textField}
                            />

                            <TextField
                                label="Nova Senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={newPassword}
                                onChange={handleNewPasswordChange} 
                                required
                                className={styles.textField}
                                error={validationErrors.length > 0} 
                                helperText={newPasswordHelperText}
                            />
                            
                            <TextField
                                label="Confirmar Nova Senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                                className={styles.textField}
                                error={newPassword !== confirmNewPassword && confirmNewPassword.length > 0}
                                helperText={newPassword !== confirmNewPassword && confirmNewPassword.length > 0 ? "As senhas não conferem." : ""}
                            />

                            {error && (
                                <Typography color="error" variant="body2" className={styles.message}>
                                    {error}
                                </Typography>
                            )}
                            {success && (
                                <Typography color="primary" variant="body2" className={styles.successMessage}>
                                    {success}
                                </Typography>
                            )}

                            <Box className={styles.buttonGroup}>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => navigate('/perfil')} 
                                    className={styles.cancelButton}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    className={styles.submitButton}
                                    disabled={isSubmitDisabled}
                                >
                                    Alterar Senha
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default ChangePassword;