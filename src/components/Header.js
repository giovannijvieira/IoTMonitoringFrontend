import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ userAuthenticated, handleLogout }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    IoT Monitoring
                </Typography>
                <Box>
                    {userAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={() => navigate('/')}>
                                Home
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
