import { Component } from 'react';
import styles from './ErrorBoundary.module.css'; // Importa as classes do CSS Module
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box className={styles.errorContainer}>
          <Box>
            <Typography variant="h4" component="h1" className={styles.errorTitle}>
              Algo deu errado!
            </Typography>
            <Typography variant="body1" className={styles.errorMessage}>
              Estamos trabalhando para resolver isso. Tente novamente mais tarde.
            </Typography>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
