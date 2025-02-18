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
  Box,
  Center,
  Stack,
  Divider,
  Group,
  keyframes,
} from '@mantine/core';
import { useAuthStore } from '../store/auth.store';

// Create keyframe animation for the SpaceX logo
const float = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-10px)' },
});

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
    <Box 
      sx={(theme) => ({
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0c14 0%, #1a1f35 100%)',
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.4,
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 95, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 95, 255, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      <Container size={420} py={80} sx={{ position: 'relative', zIndex: 1 }}>
        <Center mb={50}>
          {/* Animated SpaceX Logo */}
          <Box
            sx={{
              animation: `${float} 3s ease-in-out infinite`,
            }}
          >
            <Title
              order={1}
              align="center"
              sx={(theme) => ({
                fontSize: '2.5rem',
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              })}
            >
              SPACEX
            </Title>
            <Text
              align="center"
              color="dimmed"
              size="lg"
              mt="xs"
              sx={{ letterSpacing: '0.2em' }}
            >
              MISSION CONTROL
            </Text>
          </Box>
        </Center>

        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          sx={(theme) => ({
            backgroundColor: 'rgba(26, 27, 30, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          })}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <TextInput
                label="Username"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                sx={{ input: { height: '2.75rem' } }}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                sx={{ input: { height: '2.75rem' } }}
              />

              {error && (
                <Text color="red" size="sm" mt="xs">
                  {error}
                </Text>
              )}

              <Button
                fullWidth
                size="md"
                type="submit"
                loading={loading}
                sx={(theme) => ({
                  height: '2.75rem',
                  background: 'linear-gradient(135deg, #005FFF 0%, #003AB3 100%)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                })}
              >
                Sign in to Mission Control
              </Button>
            </Stack>
          </form>

          <Divider
            label="Demo Access"
            labelPosition="center"
            my="lg"
            sx={(theme) => ({
              label: { color: theme.colors.gray[5] },
            })}
          />

          <Group position="center" spacing="xs">
            <Text size="sm" color="dimmed">
              Username: demo
            </Text>
            <Text size="sm" color="dimmed">•</Text>
            <Text size="sm" color="dimmed">
              Password: password
            </Text>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}