import LoginForm from '../components/LoginForm';
import Container from '@mui/material/Container';

const LoginPage = ({ onLoginSuccess }) => {
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <LoginForm onLoginSuccess={onLoginSuccess} />
            </Container>
        </div>
    );
};

export default LoginPage;
