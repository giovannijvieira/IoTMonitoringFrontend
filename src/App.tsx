import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import DeviceSelection from './pages/DeviceSelection';
import DeviceCommandSelectionPage from './pages/DeviceCommandSelection';
import DashboardPage from './pages/DeviceDashboard';
import Header from './components/Header';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0366d6',
    },
    secondary: {
      main: '#28a745',
    },
    error: {
      main: '#d73a49',
    },
    background: {
      default: '#f6f8fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#24292e',
      secondary: '#586069',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

interface Command {
  commandString: string;
  description: string;
  operation: string;
  parameters: { name: string; description: string }[];
  result: string;
  format: string;
}

interface Device {
  identifier: string;
  commands: Command[];
  description: string;
  manufacturer: string;
  url: string;
}

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUserAuthenticated(true);
      setAuthToken(token);
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    setUserAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUserAuthenticated(false);
    setDevice(null); 
  };

  const handleDeviceSelectionChange = (devices: Device[]) => {
    setSelectedDevices(devices);
  };

  const handleSave = (deviceId: string, selectedCommands: string[]) => {
    const updatedDevice = selectedDevices.find(d => d.identifier === deviceId);
    if (updatedDevice) {
      const commands = updatedDevice.commands.filter(c => selectedCommands.includes(c.commandString));
      setDevice({ ...updatedDevice, commands });
      // console.log("Saved device:", { ...updatedDevice, commands }); 
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header userAuthenticated={userAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={!userAuthenticated ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <DeviceSelection authToken={authToken} onSelectionChange={handleDeviceSelectionChange} />} />
          <Route path="/device-command-selection/:deviceId" element={<DeviceCommandSelectionPage onSave={handleSave} />} />
          <Route path="/dashboard" element={<DashboardPage authToken={authToken} />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
