import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Paper, 
  Title, 
  Container, 
  Text,
  Box
} from '@mantine/core';
import { useAuthStore } from '../store/auth.store';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" mb="xl">
        Welcome to SpaceX Dashboard
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md" mt={30}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Button 
            fullWidth 
            mt="xl" 
            type="submit"
            loading={loading}
          >
            Sign in
          </Button>
        </form>

        <Box mt="md">
          <Text size="sm" align="center" color="dimmed">
            Demo credentials: username: "demo", password: "password"
          </Text>
        </Box>
      </Paper>
    </Container>
  );
}