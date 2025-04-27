import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976D2',
            hover: '#64B5F6'
        },
        secondary: {
            main: '#E3E8EF',
        },
        background: {
            default: '#F9FAFB',
        },
        success: {
            main: '#10B981',
            dark: '#059669 ',
        },
        error: {
            main: '#EF4444',
            dark: '#dc2626',
        },
        warning: {
            main: '#F59E0B',
        },
        info: {
            main: '#3B82F6',
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
        },
    },
    typography: {
        fontFamily: 'Open Sans, sans-serif',
        h6: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        body1: {
            fontSize: '1.6rem',
        },
        body2: {
            fontSize: '1.4rem',
        },
        caption:{
            fontSize: '1rem',
        },
        link: {
            '&:hover': {
                color: '#E3E8EF'
            },
        },
    },
    snackbar: {
        autoHideDuration: 6 * 1000,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
    },
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#F3F4F6', // Cor clara para linhas ímpares
                    },
                    '&:nth-of-type(even)': {
                        backgroundColor: '#FFFFFF', // Cor branca para linhas pares
                    },
                    '&.success': {
                        backgroundColor: '#10B981',
                        '&:hover': {
                            backgroundColor: '#059669 !important',
                        },
                    },
                    '&.error': {
                        backgroundColor: '#EF4444',
                        '&:hover': {
                            backgroundColor: '#DC2626 !important',
                        },
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 700, // Negrito para as células do cabeçalho 
                    backgroundColor: '#90CAF9',
                    color: '#111827',

                },
                root: {
                    padding: '.8rem 1.9rem',
                    fontSize: '1.4rem', // Fonte maior nas células
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#E3E8EF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 99,
                    height: '3.5rem'
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root:hover': {
                        backgroundColor: '#E0E7FF', // Hover nas linhas do corpo da tabela
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: '0.8rem',
                    padding: '1.2rem 2.4rem',
                    textTransform: 'none',
                    fontSize: '1.3rem',
                },
                containedPrimary: {
                    backgroundColor: '#1976D2',
                    '&:hover': {
                        backgroundColor: '#1565C0',
                    },
                },
                containedSuccess: {
                    backgroundColor: '#10B981',
                    '&:hover': {
                        backgroundColor: '#059669',
                    },
                },
            },
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    minWidth: '30rem',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '1.1rem', // Alterando o tamanho da fonte
                },
            },
        },
    },
});

export default theme;
