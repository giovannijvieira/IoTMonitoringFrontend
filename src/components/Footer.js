import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();
    return (
        <Box sx={{
            py: 8,
            px: 2,
            mt: 'auto',
            backgroundColor: theme.palette.primary.dark, 
            color: theme.palette.getContrastText(theme.palette.primary.dark) 
        }}>
            <Typography variant="body2" align="center">
                © {new Date().getFullYear()} - Iot Monitoring
            </Typography>
        </Box>
    );
};

export default Footer;
