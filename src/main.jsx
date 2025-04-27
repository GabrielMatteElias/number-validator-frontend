import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>,
)
