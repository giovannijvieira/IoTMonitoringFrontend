import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardContent, Grid, Box, Button } from '@mui/material';
import { Line, Pie, Bar, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import ConnectedIcon from '@mui/icons-material/ConnectedTv'; 
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; 

const DashboardPage = ({ authToken }) => {
    const location = useLocation();
    const { device } = location.state || {};  
    const [loading, setLoading] = useState(true);
    const [commandData, setCommandData] = useState([]);
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [connectionMessage, setConnectionMessage] = useState('');
    const [showConnectButton, setShowConnectButton] = useState(true);

    useEffect(() => {
        console.log("DashboardPage useEffect - device:", device);  
        if (device && device.commands && device.commands.length > 0) {
            fetchCommandData(device.commands);
        } else {
            setLoading(false); 
        }
    }, [device]);

    const fetchCommandData = async (commands) => {
        try {
            setLoading(true);
            console.log("Fetching command data for commands:", commands);  
            const data = commands.map(command => ({
                label: command.description,
                dataPoints: Array.from({ length: 10 }, () => Math.random() * 100) 
            }));
            setCommandData(data);
            console.log("Fetched command data:", data);  
        } catch (error) {
            console.error("Failed to fetch command data:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateChartData = (dataPoints, label) => {
        return {
            labels: dataPoints.map((_, index) => `Medição ${index + 1}`),
            datasets: [{
                label: label,
                data: dataPoints,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }]
        };
    };

    const generatePieChartData = (dataPoints, label) => {
        return {
            labels: dataPoints.map((_, index) => `Segmento ${index + 1}`),
            datasets: [{
                label: label,
                data: dataPoints,
                backgroundColor: dataPoints.map((_, index) => `rgba(75, 192, 192, ${0.1 + index * 0.1})`),
                borderColor: dataPoints.map(() => 'rgb(75, 192, 192)')
            }]
        };
    };

    const generateBarChartData = (dataPoints, label) => {
        return {
            labels: dataPoints.map((_, index) => `Medição ${index + 1}`),
            datasets: [{
                label: label,
                data: dataPoints,
                backgroundColor: dataPoints.map((_, index) => `rgba(75, 192, 192, ${0.2 + index * 0.1})`),
                borderColor: 'rgb(75, 192, 192)'
            }]
        };
    };

    const generateRadarChartData = (dataPoints, label) => {
        return {
            labels: dataPoints.map((_, index) => `Parâmetro ${index + 1}`),
            datasets: [{
                label: label,
                data: dataPoints,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            }]
        };
    };

    const handleConnect = async () => {
        setShowConnectButton(false);
        setConnecting(true);
        setConnectionMessage('Estabelecendo conexão...');

        try {
            const response = await fetch('http://localhost:5160/api/IotMonitoring/sendCommand', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hostname: device.url,
                    port: 23,
                    command: 'run report generate'
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                // console.log('Resposta do backend:', responseData);
                setConnectionMessage('Recebendo informações...');
            } else {
                // console.error('Erro ao conectar ao backend:', response.statusText);
                setConnectionMessage('Erro na conexão');
            }
        } catch (error) {
            // console.error('Erro ao conectar ao backend:', error);
            setConnectionMessage('Erro na conexão');
        } finally {
            setConnecting(false);
            setConnected(true);
        }
    };

    const handleDisconnect = () => {
        setConnected(false);
        setShowConnectButton(true);
    };

    return (
        <Box sx={{ padding: 2 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <React.Fragment>
                    <Box sx={{ mb: 4 }}>
                        <Card sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>Detalhes do Dispositivo</Typography>
                                <Typography variant="body1">ID: {device.identifier}</Typography>
                                <Typography variant="body1">Descrição: {device.description}</Typography>
                                <Typography variant="body1">Fabricante: {device.manufacturer}</Typography>
                                <Typography variant="body1">URL: {device.url}</Typography>
                            </CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                {showConnectButton ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<PlayCircleOutlineIcon />}
                                        onClick={handleConnect}
                                    >
                                        Gerar Comando
                                    </Button>
                                ) : connecting ? (
                                    <Box display="flex" alignItems="center">
                                        <ConnectedIcon fontSize="large" sx={{ animation: 'blink 1s infinite' }} />
                                        <Typography>{connectionMessage}</Typography>
                                        <Box display="flex" ml={2}>
                                            <Box sx={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: '50%', animation: 'blink 2.5s infinite alternate' }} />
                                            <Box sx={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: '50%', ml: 1, animation: 'blink 1.5s infinite alternate 0.25s' }} />
                                            <Box sx={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: '50%', ml: 1, animation: 'blink 0.5s infinite alternate 0.5s' }} />
                                        </Box>
                                    </Box>
                                ) : connected ? (
                                    <Box display="flex" alignItems="center">
                                        <ConnectedIcon fontSize="large" color="success" />
                                        <Typography color="green" ml={2}>Processo Concluído</Typography>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleDisconnect}
                                            sx={{ ml: 2 }}
                                        >
                                            Desconectar
                                        </Button>
                                    </Box>
                                ) : null}
                            </Box>
                        </Card>
                    </Box>
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                        {commandData.map((command, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ padding: 2 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {command.label} 
                                            </Typography>
                                            <Line data={generateChartData(command.dataPoints, command.label)} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ padding: 2 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {command.label} 
                                            </Typography>
                                            <Bar data={generateBarChartData(command.dataPoints, command.label)} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ padding: 2 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {command.label} 
                                            </Typography>
                                            <Pie data={generatePieChartData(command.dataPoints, command.label)} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ padding: 2 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {command.label} 
                                            </Typography>
                                            <Radar data={generateRadarChartData(command.dataPoints, command.label)} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </React.Fragment>
            )}
        </Box>
    );
};

export default DashboardPage;
