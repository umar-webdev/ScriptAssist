import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  AppShell, 
  Header, 
  Group, 
  Button, 
  Title, 
  Burger,
  Drawer,
  Stack,
  Box,
  MediaQuery,
  Container,
  useMantineTheme
} from '@mantine/core';
import { useAuthStore } from '../store/auth.store';

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpened(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60}>
          <Container size="xl" h="100%">
            <Group position="apart" h="100%" px="md">
              <MediaQuery largerThan="sm" styles={{ width: 'auto' }}>
                <Group spacing="xs" style={{ flex: 1 }}>
                  <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                    />
                  </MediaQuery>
                  <Title order={3} size="h4">SpaceX Dashboard</Title>
                </Group>
              </MediaQuery>

              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Group spacing="md">
                  <Button 
                    variant="subtle" 
                    onClick={() => navigate('/')}
                    size="md"
                  >
                    Launches
                  </Button>
                  <Button 
                    variant="light" 
                    onClick={handleLogout}
                    size="md"
                  >
                    Logout ({user?.username})
                  </Button>
                </Group>
              </MediaQuery>
            </Group>
          </Container>

          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            padding="xl"
            size="100%"
            withCloseButton
            position="left"
          >
            <Stack spacing="xl">
              <Button 
                variant="subtle" 
                onClick={() => {
                  navigate('/');
                  setOpened(false);
                }}
                fullWidth
                size="lg"
              >
                Launches
              </Button>
              <Button 
                variant="light" 
                onClick={handleLogout}
                fullWidth
                size="lg"
              >
                Logout ({user?.username})
              </Button>
            </Stack>
          </Drawer>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}