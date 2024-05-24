import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, FormGroup, Button, Container, Typography, Box, Card, CardContent, CardActions, Alert } from '@mui/material';
import DeviceIcon from '@mui/icons-material/Devices';
import CommandIcon from '@mui/icons-material/Build';

const DeviceCommandSelectionPage = ({ onSave }) => {
    const { deviceId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const device = location.state ? location.state.device : null;  
    const [selectedCommands, setSelectedCommands] = useState(new Set());
    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        setCanSave(selectedCommands.size > 0);
    }, [selectedCommands]);

    const handleToggleCommand = (commandString) => {
        const newSelection = new Set(selectedCommands);
        if (newSelection.has(commandString)) {
            newSelection.delete(commandString);
        } else {
            newSelection.add(commandString);
        }
        setSelectedCommands(newSelection);
    };

    const handleSave = () => {
        if (device) { 
            const updatedCommands = device.commands.filter(command => selectedCommands.has(command.commandString));
            const updatedDevice = { ...device, commands: updatedCommands };
            onSave(updatedDevice.identifier, Array.from(selectedCommands));
            navigate('/dashboard', { state: { device: updatedDevice } });  
        } else {
            console.error("No device data available");
        }
    };

    return (
        <Container>
            <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 5 }}>
                <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                        <DeviceIcon fontSize="large" sx={{ mr: 1 }} />
                        <Typography variant="h4" gutterBottom>
                            Selecionar Comandos para {device ? device.description : "Dispositivo não encontrado"}
                        </Typography>
                    </Box>
                    <FormGroup>
                        {device && device.commands ? (
                            device.commands.map((command) => (
                                <FormControlLabel
                                    key={command.commandString} 
                                    control={<Checkbox
                                        checked={selectedCommands.has(command.commandString)}
                                        onChange={() => handleToggleCommand(command.commandString)}
                                    />}
                                    label={
                                        <Box display="flex" alignItems="center">
                                            <CommandIcon sx={{ mr: 1 }} />
                                            {`${command.operation} - ${command.description}`}
                                        </Box>
                                    }
                                />
                            ))
                        ) : (
                            <Typography>Nenhum comando disponível.</Typography>
                        )}
                    </FormGroup>
                    {!canSave && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            Você deve marcar pelo menos um comando para prosseguir.
                        </Alert>
                    )}
                </CardContent>
                <CardActions>
                    <Button onClick={handleSave} variant="contained" color="primary" disabled={!canSave}>
                        Acessar Dados
                    </Button>
                    <Button onClick={() => navigate('/')} variant="outlined" color="error" style={{ marginLeft: '10px' }}>
                        Cancelar
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default DeviceCommandSelectionPage;
