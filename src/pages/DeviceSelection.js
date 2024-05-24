import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardContent, CardActions, Button, Grid, Box } from '@mui/material';

const DeviceSelection = ({ authToken, onSelectionChange }) => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchDeviceDetails = useCallback(async (deviceIds) => {
        const detailsPromises = deviceIds.map(async (id) => {
            const response = await fetch(`http://localhost:5160/api/devices/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data.device;
            } else {
                console.error('Failed to fetch details for device', id);
                return null;
            }
        });
        const details = (await Promise.all(detailsPromises)).filter(detail => detail !== null);
        // console.log('Fetched device details:', details);
        setDevices(details);
    }, [authToken]);

    useEffect(() => {
        const fetchDeviceIds = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5160/api/devices', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data && Array.isArray(data.devices)) {
                        fetchDeviceDetails(data.devices);
                    } else {
                        console.error('Device data is not an array:', data);
                        setDevices([]);
                    }
                } else if (response.status === 401) {
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    console.error('Failed to fetch device IDs');
                    setDevices([]);
                }
            } catch (error) {
                console.error('Error fetching device IDs:', error);
                setDevices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceIds();
    }, [authToken, fetchDeviceDetails, navigate]);

    const handleToggle = (device) => {
        navigate(`/device-command-selection/${device.identifier}`, { state: { device } });
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ padding: 20 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                devices.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
                        <Typography variant="h6" color="textSecondary">
                            Nenhum dispositivo cadastrado.
                        </Typography>
                    </Box>
                ) : (
                    devices.map((device) => (
                        <Grid item xs={12} sm={6} key={device.identifier}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Device ID: {device.identifier}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {device.manufacturer || "No manufacturer"}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        URL: {device.url || "No url"}
                                    </Typography>
                                    <Typography variant="body2">
                                        Description: {device.description || "No Description"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleToggle(device)}>Acessar Dispositivo</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )
            )}
        </Grid>
    );
};

export default DeviceSelection;
