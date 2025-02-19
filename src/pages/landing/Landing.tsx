import React, { useState } from "react";
import {
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  SimpleGrid,
  TextInput,
  Stack,
  Card,
} from "@mantine/core";
import {
  IconRocket,
  IconApi,
  IconDatabase,
  IconCode,
  IconBrandGithub,
} from "@tabler/icons-react";
import { LoginModal, RegisterModal } from '../../components/modal';
import {Navbar} from '../../components/navbar';
import { ApiExampleCard, FeatureCard, EndpointCategoryCard } from '../../components/feature';
import {Footer} from '../../components/footer';

const Landing = () => {
  const [loginOpened, setLoginOpened] = useState(false);
  const [registerOpened, setRegisterOpened] = useState(false);

  const endpointCategories = [
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
  ];

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
  onClick={() => setLoginOpened(true)}
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
  onClick={() => window.open('https://github.com/umar-webdev/ScriptAssist', '_blank')}
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
  "company": "SpaceX"
}`}
                />
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Endpoints Section */}
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
                {endpointCategories.map((category) => (
                  <EndpointCategoryCard 
                    key={category.title} 
                    category={category} 
                  />
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