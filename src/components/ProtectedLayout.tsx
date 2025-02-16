import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Header, Group, Button, Title } from '@mantine/core';
import { useAuthStore } from '../store/auth.store';

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Title order={3}>SpaceX Dashboard</Title>
            <Group>
              <Button variant="subtle" onClick={() => navigate('/')}>
                Launches
              </Button>
              <Button variant="light" onClick={handleLogout}>
                Logout ({user?.username})
              </Button>
            </Group>
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}