import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Text,
  Container,
  Group,
  Button,
  Card,
  Burger ,
  SimpleGrid,
  Badge,
  Box,
  Paper,
  Code,
  Modal,
  TextInput,
  Stack,
  PasswordInput,
} from "@mantine/core";

import {
  IconRocket,
  IconApi,
  IconDatabase,
  IconCode,
  IconBrandGithub,
  IconMenu2,
} from "@tabler/icons-react";
// Login Modal Component
const LoginModal = ({ opened, onClose }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) =>
        u.username || 'demo' === formData.username && u.password || 'spacex2024' === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      onClose();
      navigate("/launchList");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      title={
        <Group spacing="xs">
          <IconRocket size={24} color="white" />
          <Title order={2} color="white" sx={{ fontSize: "1.5rem" }}>
            Sign In to SpaceX API
          </Title>
        </Group>
      }
      styles={{
        root: {
          zIndex: 1001,
        },
        modal: {
          backgroundColor: "#1A1B1E",
          width: "460px",
          padding: "24px",
          border: "none",
          borderRadius: 0,
        },
        header: {
          padding: 20,
          marginBottom: "24px",
        },
        title: {
          color: "white",
          width: "100%",
        },
        close: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(4px)",
        },
        body: {
          padding: 0,
        },
        inner: {
          padding: "40px 20px",
        },
      }}
    >
      <Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              required
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              styles={{
                label: {
                  color: "white",
                  marginBottom: "8px",
                  fontWeight: 400,
                },
                input: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  height: "42px",
                  "&:focus": {
                    border: "1px solid white",
                  },
                  "&::placeholder": {
                    color: "#5C5F66",
                  },
                },
              }}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              styles={{
                label: {
                  color: "white",
                  marginBottom: "8px",
                  fontWeight: 400,
                },
                input: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  height: "42px",
                },
                innerInput: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  "&::placeholder": {
                    color: "#5C5F66",
                  },
                },
                visibilityToggle: {
                  color: "#5C5F66",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "white",
                  },
                },
              }}
            />

            {error && (
              <Text color="red" size="sm">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "white",
                color: "black",
                height: "42px",
                border: 0,
                borderRadius: 0,
                fontWeight: 500,
                letterSpacing: "0.02em",
                marginTop: "24px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              Sign In
            </Button>

            <Code
              block
              sx={{
                backgroundColor: "#141517",
                color: "#A3A3A3",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 0,
                padding: 16,
                marginTop: "16px",
                fontSize: "12px",
              }}
            >
              Try demo account: username: demo password: spacex2024
            </Code>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

// Register Modal Component
const RegisterModal = ({ opened, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.username === formData.username)) {
      setError("Username already exists");
      return;
    }

    if (users.some((u) => u.email === formData.email)) {
      setError("Email already registered");
      return;
    }

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      apiKey: "sx-" + Math.random().toString(36).substring(2, 15),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    onClose();
    navigate("/launchList");
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      title={
        <Group spacing="xs">
          <IconRocket size={24} color="white" />
          <Title order={2} color="white" sx={{ fontSize: "1.5rem" }}>
            Create SpaceX API Account
          </Title>
        </Group>
      }
      styles={{
        root: {
          zIndex: 1001,
        },
        modal: {
          backgroundColor: "#1A1B1E",
          width: "460px",
          padding: "24px",
          border: "none",
          borderRadius: 0,
        },
        header: {
          padding: 20,
          marginBottom: "24px",
        },
        title: {
          color: "white",
          width: "100%",
        },
        close: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(4px)",
        },
        body: {
          padding: 0,
        },
        inner: {
          padding: "40px 20px",
        },
      }}
    >
      <Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              required
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              styles={{
                input: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  height: "42px",
                  "&:focus": {
                    border: "1px solid white",
                  },
                  "&::placeholder": {
                    color: "#5C5F66",
                  },
                },
              }}
            />

            <TextInput
              required
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              styles={{
                input: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  height: "42px",
                  "&:focus": {
                    border: "1px solid white",
                  },
                  "&::placeholder": {
                    color: "#5C5F66",
                  },
                },
              }}
            />

            <PasswordInput
              required
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              styles={{
                input: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  height: "42px",
                },
                innerInput: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  "&::placeholder": {
                    color: "#5C5F66",
                  },
                },
                visibilityToggle: {
                  color: "#5C5F66",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "white",
                  },
                },
              }}
            />

            <PasswordInput
              required
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              styles={{
                input: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  height: "42px",
                },
                innerInput: {
                  backgroundColor: "#141517",
                  border: "none",
                  color: "white",
                  "&::placeholder": {
                    color: "#5C5F66",
                  },
                },
                visibilityToggle: {
                  color: "#5C5F66",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "white",
                  },
                },
              }}
            />

            {error && (
              <Text color="red" size="sm">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "white",
                color: "black",
                height: "42px",
                border: 0,
                borderRadius: 0,
                fontWeight: 500,
                letterSpacing: "0.02em",
                marginTop: "24px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              Create Account
            </Button>

            <Text color="dimmed" size="xs" align="center" mt="md">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </Text>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "OVERVIEW", href: "#home" },
    { label: "FEATURES", href: "#features" },
    { label: "ENDPOINTS", href: "#endpoints" },
    // { label: "EXAMPLES", href: "#examples" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Container size="lg">
        <Group position="apart" sx={{ height: "80px" }}>
          {/* Logo */}
          <Text
            weight={700}
            size="xl"
            color="white"
            sx={{
              fontFamily: "monospace",
              letterSpacing: "-1px",
            }}
          >
            SPACEX API
          </Text>

          {/* Desktop Navigation */}
          <Group
            spacing={32}
            sx={{
              display: "none",
              "@media (min-width: 769px)": {
                display: "flex",
              },
            }}
          >
            {menuItems.map((item) => (
              <Text
                key={item.label}
                component="a"
                href={item.href}
                color="dimmed"
                size="sm"
                weight={500}
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": { color: "white" },
                }}
              >
                {item.label}
              </Text>
            ))}
          </Group>

          {/* Desktop Auth Buttons */}
          <Group
            spacing={16}
            sx={{
              display: "none",
              "@media (min-width: 769px)": {
                display: "flex",
              },
            }}
          >
            <Button
              variant="subtle"
              color="gray"
              onClick={onLoginClick}
              sx={{
                color: "white",
                border: "1px solid white",
                borderRadius: 0,
                background: "black",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              LOGIN
            </Button>
            <Button
              onClick={onRegisterClick}
              sx={{
                backgroundColor: "white",
                color: "black",
                border: 0,
                borderRadius: 0,
                height: "40px",
                padding: "0 24px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              REGISTER
            </Button>
          </Group>

          {/* Mobile Menu Button */}
          <Burger
            opened={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            color="white"
            sx={{
              display: "none",
              "@media (max-width: 768px)": {
                display: "block",
              },
            }}
          />
        </Group>

        {/* Mobile Navigation Menu */}
        <Box
          sx={{
            display: isMobileMenuOpen ? "block" : "none",
            position: "absolute",
            top: "80px",
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            padding: "20px 0",
            "@media (min-width: 769px)": {
              display: "none",
            },
          }}
        >
          <Stack spacing="lg" align="stretch" px="md">
            {menuItems.map((item) => (
              <Text
                key={item.label}
                component="a"
                href={item.href}
                color="dimmed"
                size="sm"
                weight={500}
                onClick={() => setIsMobileMenuOpen(false)}
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  padding: "10px 20px",
                  "&:hover": { color: "white" },
                }}
              >
                {item.label}
              </Text>
            ))}
            <Group position="apart" mt="md" px="md">
              <Button
                variant="subtle"
                color="gray"
                onClick={() => {
                  onLoginClick();
                  setIsMobileMenuOpen(false);
                }}
                fullWidth
                sx={{
                  color: "white",
                  border: "1px solid white",
                  borderRadius: 0,
                  background: "black",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                LOGIN
              </Button>
              <Button
                onClick={() => {
                  onRegisterClick();
                  setIsMobileMenuOpen(false);
                }}
                fullWidth
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  border: 0,
                  borderRadius: 0,
                  height: "40px",
                  padding: "0 24px",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                REGISTER
              </Button>
            </Group>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

const ApiExampleCard = ({ endpoint, method, description, example }) => (
  <Paper
    id="examples"
    p={32}
    sx={{
      backgroundColor: "#0F1112",
      borderRadius: 0,
      border: "1px solid rgba(255, 255, 255, 0.1)",
    }}
  >
    <Group position="apart" mb={24}>
      <Badge
        sx={{
          backgroundColor: "transparent",
          color: "#FFFFFF",
          border: "1px solid rgb(255, 255, 255)",
          borderRadius: 0,
          padding: "4px 8px",
          height: "auto",
        }}
      >
        {method}
      </Badge>
      <Text color="#A3A3A3" sx={{ fontFamily: "monospace" }}>
        {endpoint}
      </Text>
    </Group>
    <Text color="#A3A3A3" mb={16}>
      {description}
    </Text>
    <Code
      block
      sx={{
        backgroundColor: "transparent",
        color: "#FFFFFF",
        border: "1px solid rgb(255, 255, 255)",
        borderRadius: 0,
        padding: 24,
        fontSize: "14px",
        lineHeight: 1.6,
      }}
    >
      {example}
    </Code>
  </Paper>
);

const FeatureCard = ({ icon, title, description }) => (
  <Card
    id="features"
    p={32}
    sx={{
      backgroundColor: "#181C1F",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: 0,
      transition: "all 0.2s",
      "&:hover": {
        transform: "translateY(-2px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
    }}
  >
    <Box
      sx={{
        color: "#FFFFFF",
        marginBottom: 24,
      }}
    >
      {icon}
    </Box>
    <Title
      order={3}
      mb={16}
      sx={{
        color: "#FFFFFF",
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}
    >
      {title}
    </Title>
    <Text
      color="#A3A3A3"
      sx={{
        lineHeight: 1.6,
      }}
    >
      {description}
    </Text>
  </Card>
);

const Footer = () => (
  <Box
    sx={{
      backgroundColor: "black",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      padding: "80px 0 40px",
    }}
  >
    <Container size="lg">
      <SimpleGrid
        cols={4}
        spacing={64}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 32 }]}
      >
        <Stack spacing={16}>
          <Text weight={700} color="white" size="sm">
            SPACEX API
          </Text>
          <Text color="dimmed" size="sm">
            The official SpaceX API provides programmatic access to launch data,
            vehicle information, and mission details.
          </Text>
        </Stack>
        <Stack spacing={16}>
          <Text weight={600} color="white" size="sm">
            API RESOURCES
          </Text>
          {["Documentation", "Endpoints", "Authentication", "Rate Limits"].map(
            (item) => (
              <Text
                key={item}
                color="dimmed"
                size="sm"
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: "white" },
                }}
              >
                {item}
              </Text>
            )
          )}
        </Stack>
        <Stack spacing={16}>
          <Text weight={600} color="white" size="sm">
            DEVELOPERS
          </Text>
          {["Getting Started", "API Reference", "Examples", "Libraries"].map(
            (item) => (
              <Text
                key={item}
                color="dimmed"
                size="sm"
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: "white" },
                }}
              >
                {item}
              </Text>
            )
          )}
        </Stack>
        <Stack spacing={16}>
          <Text weight={600} color="white" size="sm">
            LEGAL
          </Text>
          {["Terms of Service", "Privacy Policy", "Security", "Support"].map(
            (item) => (
              <Text
                key={item}
                color="dimmed"
                size="sm"
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: "white" },
                }}
              >
                {item}
              </Text>
            )
          )}
        </Stack>
      </SimpleGrid>
      <Text color="dimmed" size="sm" align="center" mt={80}>
        © {new Date().getFullYear()} Space Exploration Technologies Corp.
      </Text>
    </Container>
  </Box>
);

const Landing = () => {
  const [loginOpened, setLoginOpened] = useState(false);
  const [registerOpened, setRegisterOpened] = useState(false);
  return (
    <>
      <Box sx={{ backgroundColor: "black", minHeight: "100vh" }}>
        <Navbar
          onLoginClick={() => setLoginOpened(true)}
          onRegisterClick={() => setRegisterOpened(true)}
        />

        {/* Hero Section */}
        <Box
          id="home"
          sx={{
            background: "black",
            padding: "160px 0 120px",
            position: "relative",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Container size="lg">
            <Stack spacing={48} align="center">
              <Title
                order={1}
                sx={{
                  color: "#FFFFFF",
                  fontSize: "4rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  "@media (max-width: 768px)": {
                    fontSize: "2.5rem",
                  },
                }}
              >
                SpaceX API
              </Title>
              <Text
                color="#A3A3A3"
                size="xl"
                sx={{
                  maxWidth: 540,
                  textAlign: "center",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                }}
              >
                Access comprehensive data about SpaceX launches, rockets, and
                missions through our modern REST API
              </Text>
              <Group spacing="md">
                <Button
                  size="lg"
                  leftIcon={<IconCode size={20} />}
                  styles={() => ({
                    root: {
                      backgroundColor: "#FFFFFF",
                      color: "#0F1112",
                      height: "48px",
                      padding: "0 32px",
                      border: 0,
                      borderRadius: 0,
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      transition: "transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#FFFFFF",
                        transform: "translateY(-2px)",
                      },
                    },
                  })}
                >
                  GET STARTED
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  leftIcon={<IconBrandGithub size={20} />}
                  styles={() => ({
                    root: {
                      backgroundColor: "transparent",
                      borderColor: "#FFFFFF",
                      color: "#FFFFFF",
                      height: "48px",
                      border: "1px solid",
                      padding: "0 32px",
                      borderRadius: 0,
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        transform: "translateY(-2px)",
                      },
                    },
                  })}
                >
                  GITHUB
                </Button>
              </Group>
            </Stack>
          </Container>
        </Box>
        <LoginModal
          opened={loginOpened}
          onClose={() => setLoginOpened(false)}
        />
        <RegisterModal
          opened={registerOpened}
          onClose={() => setRegisterOpened(false)}
        />
        {/* Examples Section */}
        <Box
          sx={{
            backgroundColor: "black",
            padding: "120px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Container size="lg">
            <Stack spacing={64}>
              <Title
                order={2}
                color="#FFFFFF"
                align="center"
                sx={{
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  marginBottom: 48,
                }}
              >
                Powerful Endpoints
              </Title>
              <Stack spacing={32}>
                <ApiExampleCard
                  method="GET"
                  endpoint="/v4/launches/latest"
                  description="Get detailed information about the latest SpaceX launch"
                  example={`{
  "flight_number": 124,
  "name": "Starlink 4-2",
  "date_utc": "2024-02-15T19:12:00.000Z",
  "success": true,
  "rocket": "5e9d0d95eda69973a809d1ec",
  "details": "SpaceX's Starlink mission..."
}`}
                />
                <ApiExampleCard
                  method="GET"
                  endpoint="/v4/rockets"
                  description="Access specifications and details about SpaceX rockets"
                  example={`{
  "name": "Falcon 9",
  "type": "rocket",
  "active": true,
  "stages": 2,
  "boosters": 0,
  "cost_per_launch": 50000000,
  "success_rate_pct": 98,
  "first_flight": "2010-06-04",
  "country": "United States",
  "company": "SpaceX",
  "height": {
    "meters": 70,
    "feet": 229.6
  },
  "diameter": {
    "meters": 3.7,
    "feet": 12
  }
}`}
                />
              </Stack>
            </Stack>
          </Container>
        </Box>
        <Box
          id="endpoints"
          sx={{
            backgroundColor: "black",
            padding: "120px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Container size="lg">
            <Stack spacing={64}>
              <Stack spacing={16} align="center">
                <Title
                  order={2}
                  color="#FFFFFF"
                  align="center"
                  sx={{
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  API Endpoints
                </Title>
                <Text
                  color="#A3A3A3"
                  size="lg"
                  sx={{
                    maxWidth: 600,
                    textAlign: "center",
                  }}
                >
                  Explore our comprehensive collection of endpoints to access
                  SpaceX data
                </Text>
              </Stack>

              <SimpleGrid
                cols={2}
                spacing={32}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              >
                {[
                  {
                    title: "Launches",
                    endpoints: [
                      {
                        method: "GET",
                        path: "/v4/launches",
                        desc: "Get all launches",
                      },
                      {
                        method: "GET",
                        path: "/v4/launches/latest",
                        desc: "Get latest launch",
                      },
                      {
                        method: "GET",
                        path: "/v4/launches/next",
                        desc: "Get next launch",
                      },
                      {
                        method: "GET",
                        path: "/v4/launches/upcoming",
                        desc: "Get upcoming launches",
                      },
                    ],
                  },
                  {
                    title: "Rockets",
                    endpoints: [
                      {
                        method: "GET",
                        path: "/v4/rockets",
                        desc: "Get all rockets",
                      },
                      {
                        method: "GET",
                        path: "/v4/rockets/:id",
                        desc: "Get rocket by ID",
                      },
                      {
                        method: "GET",
                        path: "/v4/rockets/stats",
                        desc: "Get rocket stats",
                      },
                    ],
                  },
                  {
                    title: "Missions",
                    endpoints: [
                      {
                        method: "GET",
                        path: "/v4/missions",
                        desc: "Get all missions",
                      },
                      {
                        method: "GET",
                        path: "/v4/missions/:id",
                        desc: "Get mission by ID",
                      },
                    ],
                  },
                  {
                    title: "Company",
                    endpoints: [
                      {
                        method: "GET",
                        path: "/v4/company",
                        desc: "Get company info",
                      },
                      {
                        method: "GET",
                        path: "/v4/history",
                        desc: "Get company history",
                      },
                    ],
                  },
                ].map((category) => (
                  <Card
                    key={category.title}
                    p={32}
                    sx={{
                      backgroundColor: "#181C1F",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 0,
                    }}
                  >
                    <Title
                      order={3}
                      mb={24}
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {category.title}
                    </Title>
                    <Stack spacing={16}>
                      {category.endpoints.map((endpoint) => (
                        <Group
                          key={endpoint.path}
                          position="apart"
                          sx={{
                            padding: "12px 16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.02)",
                            },
                          }}
                        >
                          <Group spacing={12}>
                            <Badge
                              sx={{
                                backgroundColor: "transparent",
                                color: "#FFFFFF",
                                border: "1px solid rgb(255, 255, 255)",
                                borderRadius: 0,
                                padding: "4px 8px",
                                height: "auto",
                                minWidth: "50px",
                              }}
                            >
                              {endpoint.method}
                            </Badge>
                            <Text
                              color="dimmed"
                              size="sm"
                              sx={{ fontFamily: "monospace" }}
                            >
                              {endpoint.path}
                            </Text>
                          </Group>
                          <Text color="dimmed" size="sm">
                            {endpoint.desc}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>
        {/* Features Section */}
        <Container size="lg" sx={{ padding: "120px 0" }}>
          <SimpleGrid
            cols={3}
            spacing={40}
            breakpoints={[
              { maxWidth: "md", cols: 2 },
              { maxWidth: "sm", cols: 1 },
            ]}
          >
            <FeatureCard
              icon={<IconRocket size={24} />}
              title="Real-time Data"
              description="Get up-to-date information about launches, rockets, and missions as they happen"
            />
            <FeatureCard
              icon={<IconApi size={24} />}
              title="Modern REST API"
              description="Well-documented endpoints with JSON responses and comprehensive query parameters"
            />
            <FeatureCard
              icon={<IconDatabase size={24} />}
              title="Rich Dataset"
              description="Access detailed information about vehicles, launch sites, and historical missions"
            />
          </SimpleGrid>
        </Container>

        {/* CTA Section */}
        <Container size="lg" sx={{ padding: "0 0 120px 0" }}>
          <Card
            p={48}
            sx={{
              backgroundColor: "#181C1F",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 0,
            }}
          >
            <Group position="apart" align="center">
              <Stack spacing={8}>
                <Title
                  order={2}
                  color="#FFFFFF"
                  sx={{
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Ready to Launch?
                </Title>
                <Text color="#A3A3A3">
                  Sign up for API access and start building
                </Text>
              </Stack>
              <Group>
                <TextInput
                  placeholder="Enter your email"
                  styles={{
                    input: {
                      backgroundColor: "transparent",
                      border: "1px solid rgb(255, 255, 255)",
                      borderRadius: 0,
                      height: "48px",
                      minWidth: "300px",
                      color: "#FFFFFF",
                      "&:focus": {
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                      },
                    },
                  }}
                />
                <Button
                  size="md"
                  styles={() => ({
                    root: {
                      backgroundColor: "#FFFFFF",
                      color: "#0F1112",
                      height: "48px",
                      padding: "0 32px",
                      borderRadius: 0,
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      "&:hover": {
                        backgroundColor: "#FFFFFF",
                        transform: "translateY(-2px)",
                      },
                    },
                  })}
                >
                  GET API KEY
                </Button>
              </Group>
            </Group>
          </Card>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Landing;
