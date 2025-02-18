import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  Group,
  Button,
  Title,
  Burger,
  Drawer,
  Stack,
  Container,
  Text,
  Box,
  UnstyledButton,
  useMantineTheme,
  Divider,
  Menu,
  Paper,
  ActionIcon,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconRocket,
  IconLogout,
  IconSettings,
  IconDashboard,
  IconChevronDown,
  IconBrandGithub,
  IconApiApp,
  IconUserCircle,
  IconChevronRight
} from '@tabler/icons-react';

// SpaceX brand colors
const SPACEX_COLORS = {
  background: '#0B0E11',
  surface: '#141619',
  primary: '#005288',
  accent: '#A7A9AC',
  border: 'rgba(255, 255, 255, 0.1)'
};

const NavLink = ({ icon: Icon, label, to, onClick, active }) => (
  <UnstyledButton
    component={to ? Link : 'button'}
    to={to}
    onClick={onClick}
    sx={(theme) => ({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '12px 16px',
      borderRadius: '6px',
      color: active ? 'white' : theme.colors.gray[3],
      backgroundColor: active ? 'rgba(0, 82, 136, 0.15)' : 'transparent',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: active ? 'rgba(0, 82, 136, 0.25)' : 'rgba(255, 255, 255, 0.05)',
        transform: 'translateX(4px)',
      },
    })}
  >
    <Group position="apart" sx={{ width: '100%' }}>
      <Group>
        <Icon size={20} stroke={1.5} />
        <Text size="sm" weight={500}>{label}</Text>
      </Group>
      {active && <IconChevronRight size={16} />}
    </Group>
  </UnstyledButton>
);

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const [currentUser, setCurrentUser] = useState(null);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [activePage, setActivePage] = useState(window.location.pathname);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const mainLinks = [
    { icon: IconDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: IconRocket, label: 'Launches', to: '/Launchlist' },
    { icon: IconApiApp, label: 'API Access', to: '/api' },
  ];

  return (
    <AppShell
      padding={0}
      navbar={
        <Navbar 
          p="md" 
          hiddenBreakpoint="sm" 
          hidden={!opened} 
          width={{ sm: 280, lg: 300 }}
          sx={{
            backgroundColor: SPACEX_COLORS.surface,
            border: 'none',
            borderRight: `1px solid ${SPACEX_COLORS.border}`,
          }}
        >
          <Navbar.Section>
            <Box px="md" py="lg">
              <Group spacing="xs">
                <IconRocket size={24} stroke={1.5} color={SPACEX_COLORS.primary} />
                <Text weight={700} size="lg" sx={{ color: 'white' }}>
                  SpaceX Console
                </Text>
              </Group>
            </Box>
            <Divider 
              color={SPACEX_COLORS.border}
            />
          </Navbar.Section>

          <Navbar.Section grow mt="xl">
            <Stack spacing="xs" px="md">
              {mainLinks.map((link) => (
                <NavLink 
                  key={link.label} 
                  {...link} 
                  active={activePage === link.to}
                  onClick={() => {
                    setActivePage(link.to);
                    navigate(link.to);
                  }}
                />
              ))}
            </Stack>
          </Navbar.Section>

          <Navbar.Section>
            <Divider color={SPACEX_COLORS.border} />
            <Box p="md">
              <Paper
                p="md"
                radius="md"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${SPACEX_COLORS.border}`,
                }}
              >
                <Group position="apart" mb="xs">
                  <Group spacing="sm">
                    <Avatar 
                      size={32} 
                      radius="xl"
                      src={null}
                      sx={{ 
                        backgroundColor: SPACEX_COLORS.primary,
                        color: 'white',
                      }}
                    >
                      {currentUser?.username?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                      <Text size="sm" weight={500} color="white">
                        {currentUser?.username}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {currentUser?.email}
                      </Text>
                    </Box>
                  </Group>
                </Group>
                
                
              </Paper>
            </Box>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header 
          height={64} 
          sx={{ 
            backgroundColor: SPACEX_COLORS.surface,
            borderBottom: `1px solid ${SPACEX_COLORS.border}`,
            position: 'fixed',
            top: 0,
            width: '100%',
          }}
        >
          <Container size="xl" h="100%">
            <Group position="apart" sx={{ height: '100%' }}>
              <Group>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  size="sm"
                  color={theme.colors.gray[6]}
                  sx={{ display: { sm: 'none' } }}
                />
                <Group spacing="xs">
                  <IconRocket size={24} stroke={1.5} color={SPACEX_COLORS.primary} />
                  <Text weight={700} size="lg" color="white">SpaceX</Text>
                </Group>
              </Group>

              <Group spacing="sm">
                <ActionIcon 
                  variant="subtle" 
                  size="lg"
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <IconBrandGithub size={20} />
                </ActionIcon>

                <Menu
                  position="bottom-end"
                  shadow="lg"
                  width={200}
                  transitionProps={{ transition: 'pop-top-right' }}
                  styles={{
                    dropdown: {
                      backgroundColor: SPACEX_COLORS.surface,
                      border: `1px solid ${SPACEX_COLORS.border}`,
                    }
                  }}
                >
                  <Menu.Target>
                    <Button 
                      variant="subtle" 
                      rightIcon={<IconChevronDown size={14} />}
                      leftIcon={<IconUserCircle size={14} />}
                      sx={{
                        color: 'black',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.66)',
                        }
                      }}
                    >
                      {currentUser?.username}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Divider />
                    <Menu.Item 
                      icon={<IconLogout size={14} />}
                      onClick={handleLogout}
                      color="red"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 26, 26, 0.15)',
                        }
                      }}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Container>
        </Header>
      }
      styles={{
        main: {
          backgroundColor: SPACEX_COLORS.background,
          minHeight: '100vh',
          paddingTop: 64
        }
      }}
    >
      <Box 
        sx={{ 
          minHeight: 'calc(100vh - 64px)',
          position: 'relative'
        }}
      >
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default ProtectedLayout;