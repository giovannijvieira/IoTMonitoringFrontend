import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault(); 
        const apiURL = process.env.REACT_APP_API_URL || ''; 
        try {
            const response = await fetch(`${apiURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                onLoginSuccess(data.token); 
            } else {
                
                alert('Falha no login! Por favor, verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            alert('Erro ao conectar com o serviço de autenticação.');
        }
    };

    return (
        <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
            <TextField label="Email" value={email} onChange={handleEmailChange} margin="normal" />
            <TextField label="Senha" type="password" value={password} onChange={handlePasswordChange} margin="normal" />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                Entrar
            </Button>
        </Box>
    );
};

export default LoginForm;
