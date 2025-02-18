import { useState } from 'react';
import {
  Box,
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Button,
  Code,
  CopyButton,
  Tabs,
  Badge,
  Accordion,
  Alert,
  TextInput,
} from '@mantine/core';
import { 
  Key, 
  Copy, 
  Check, 
  RefreshCcw,
  Clock,
  AlertCircle,
  Terminal,
  Database,
  Rocket,
  Lock
} from 'lucide-react';

const SPACEX_COLORS = {
  background: '#0B0E11',
  surface: '#141619',
  primary: '#005288',
  accent: '#A7A9AC',
  success: '#27A769',
  error: '#DC3545',
  warning: '#FFC107',
  border: 'rgba(255, 255, 255, 0.1)'
};

const EndpointExample = ({ method, endpoint, description, responseExample }) => (
  <Accordion.Item value={endpoint}>
    <Accordion.Control>
      <Group position="apart">
        <Group>
          <Badge
            variant="filled"
            radius="sm"
            sx={{
              textTransform: 'uppercase',
              backgroundColor: 
                method === 'GET' ? 'rgba(39, 167, 105, 0.2)' :
                method === 'POST' ? 'rgba(0, 82, 136, 0.2)' :
                'rgba(255, 193, 7, 0.2)',
              color:
                method === 'GET' ? SPACEX_COLORS.success :
                method === 'POST' ? SPACEX_COLORS.primary :
                SPACEX_COLORS.warning,
            }}
          >
            {method}
          </Badge>
          <Text weight={500} color="white">
            {endpoint}
          </Text>
        </Group>
      </Group>
    </Accordion.Control>
    <Accordion.Panel>
      <Stack spacing="md">
        <Text color="dimmed" size="sm">
          {description}
        </Text>
        <Text size="sm" weight={500} color={SPACEX_COLORS.accent}>
          Example Response:
        </Text>
        <Code
          block
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 8,
            padding: 16,
            '.mantine-Code-pre': {
              color: SPACEX_COLORS.accent,
            }
          }}
        >
          {responseExample}
        </Code>
      </Stack>
    </Accordion.Panel>
  </Accordion.Item>
);

export default function ApiAccessPage() {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [activeTab, setActiveTab] = useState('documentation');

  return (
    <Box p="xl">
      <Container size="xl">
        <Stack spacing="xl">
          {/* Header */}
          <Box mb="lg">
            <Title order={2} size={28} weight={600} color="white" mb={8}>
              API Access
            </Title>
            <Text color="dimmed">
              Access SpaceX data programmatically through our REST API
            </Text>
          </Box>

          {/* API Key Section */}
          <Paper
            p="xl"
            radius="md"
            sx={{
              backgroundColor: SPACEX_COLORS.surface,
              border: `1px solid ${SPACEX_COLORS.border}`,
            }}
          >
            <Stack spacing="md">
              <Group position="apart">
                <Group>
                  <Key size={20} color={SPACEX_COLORS.primary} />
                  <Text weight={500} size="lg">Your API Key</Text>
                </Group>
                <Button
                  variant="subtle"
                  leftIcon={<RefreshCcw size={16} />}
                  color="blue"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 82, 136, 0.1)',
                    }
                  }}
                >
                  Regenerate
                </Button>
              </Group>

              <Group spacing="md" sx={{ width: '100%' }}>
                <Code
                  sx={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: SPACEX_COLORS.accent,
                  }}
                >
                  {currentUser?.apiKey || 'sx-' + Math.random().toString(36).substring(2, 15)}
                </Code>
                <CopyButton value={currentUser?.apiKey || ''} timeout={2000}>
                {({ copied, copy }) => (
                    <Button
                      color={copied ? 'green' : 'blue'}
                      onClick={copy}
                      leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                      sx={{
                        backgroundColor: copied ? 
                          'rgba(39, 167, 105, 0.15)' : 
                          'rgba(0, 82, 136, 0.15)',
                        '&:hover': {
                          backgroundColor: copied ?
                            'rgba(39, 167, 105, 0.25)' :
                            'rgba(0, 82, 136, 0.25)',
                        }
                      }}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  )}
                </CopyButton>
              </Group>

              <Alert
                icon={<Clock size={16} />}
                color="blue"
                radius="md"
                sx={{
                  backgroundColor: 'rgba(0, 82, 136, 0.1)',
                  border: '1px solid rgba(0, 82, 136, 0.2)',
                }}
              >
                <Text size="sm" color="dimmed">
                  Rate limit: 150 requests per minute
                </Text>
              </Alert>
            </Stack>
          </Paper>

          {/* Documentation Tabs */}
          <Tabs 
            value={activeTab} 
            onTabChange={setActiveTab}
            sx={{
              '.mantine-Tabs-tab': {
                color: SPACEX_COLORS.accent,
                borderColor: SPACEX_COLORS.border,
                '&[data-active]': {
                  color: 'white',
                  borderColor: SPACEX_COLORS.primary,
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: SPACEX_COLORS.primary,
                },
              }
            }}
          >
            <Tabs.List grow mb="xl">
              <Tabs.Tab 
                value="documentation" 
                icon={<Terminal size={14} />}
              >
                Documentation
              </Tabs.Tab>
              <Tabs.Tab 
                value="examples" 
                icon={<Database size={14} />}
              >
                Examples
              </Tabs.Tab>
              <Tabs.Tab 
                value="authentication" 
                icon={<Lock size={14} />}
              >
                Authentication
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="documentation">
              <Stack spacing="xl">
                <Paper
                  p="xl"
                  radius="md"
                  sx={{
                    backgroundColor: SPACEX_COLORS.surface,
                    border: `1px solid ${SPACEX_COLORS.border}`,
                  }}
                >
                  <Stack spacing="lg">
                    <Title order={3} size="h4" color="white">
                      Available Endpoints
                    </Title>

                    <Accordion 
                      variant="contained"
                      sx={{
                        '.mantine-Accordion-item': {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          border: `1px solid ${SPACEX_COLORS.border}`,
                          '&[data-active]': {
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          }
                        },
                        '.mantine-Accordion-control:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        }
                      }}
                    >
                      <EndpointExample
                        method="GET"
                        endpoint="/v5/launches"
                        description="Retrieve all SpaceX launches, including past and upcoming missions."
                        responseExample={`{
  "docs": [
    {
      "flight_number": 1,
      "name": "FalconSat",
      "date_utc": "2006-03-24T22:30:00.000Z",
      "success": false,
      "cores": [
        {
          "core": "5e9e289df35918033d3b2623",
          "flight": 1,
          "gridfins": false,
          "legs": false,
          "reused": false,
          "landing_attempt": false,
          "landing_success": null
        }
      ]
    }
  ],
  "totalDocs": 200,
  "offset": 0,
  "limit": 10,
  "totalPages": 20,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}`}
                      />

                      <EndpointExample
                        method="GET"
                        endpoint="/v5/launches/latest"
                        description="Get detailed information about the latest SpaceX launch."
                        responseExample={`{
  "fairings": {
    "reused": true,
    "recovery_attempt": true,
    "recovered": true
  },
  "links": {
    "patch": {
      "small": "https://imgur.com/BrW201S.png",
      "large": "https://imgur.com/573IfGk.png"
    },
    "webcast": "https://youtu.be/bXqn3NSEHHk"
  },
  "static_fire_date_utc": "2024-02-14T10:00:00.000Z",
  "success": true,
  "details": "SpaceX's latest Starlink mission..."
}`}
                      />

                      <EndpointExample
                        method="GET"
                        endpoint="/v5/rockets"
                        description="Get information about all SpaceX rockets."
                        responseExample={`[
  {
    "height": {
      "meters": 70,
      "feet": 229.6
    },
    "diameter": {
      "meters": 3.7,
      "feet": 12
    },
    "mass": {
      "kg": 549054,
      "lb": 1207920
    },
    "first_stage": {
      "thrust_sea_level": {
        "kN": 7607,
        "lbf": 1710000
      },
      "reusable": true,
      "engines": 9,
      "fuel_amount_tons": 385
    }
  }
]`}
                      />
                    </Accordion>
                  </Stack>
                </Paper>

                <Alert
                  icon={<AlertCircle size={16} />}
                  color="blue"
                  radius="md"
                  sx={{
                    backgroundColor: 'rgba(0, 82, 136, 0.1)',
                    border: '1px solid rgba(0, 82, 136, 0.2)',
                  }}
                >
                  <Text size="sm" mb={8} weight={500}>Base URL</Text>
                  <Code
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: SPACEX_COLORS.accent,
                    }}
                  >
                    https://api.spacexdata.com/v5
                  </Code>
                  <Text size="sm" mt={8} color="dimmed">
                    All API requests should be made to this base URL.
                  </Text>
                </Alert>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="examples">
              <Paper
                p="xl"
                radius="md"
                sx={{
                  backgroundColor: SPACEX_COLORS.surface,
                  border: `1px solid ${SPACEX_COLORS.border}`,
                }}
              >
                <Stack spacing="xl">
                  <Title order={3} size="h4" color="white">
                    Code Examples
                  </Title>

                  <Box>
                    <Text weight={500} size="sm" color={SPACEX_COLORS.accent} mb={8}>
                      JavaScript/Node.js
                    </Text>
                    <Code
                      block
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: 8,
                        padding: 16,
                        '.mantine-Code-pre': {
                          color: SPACEX_COLORS.accent,
                        }
                      }}
                    >
{`const response = await fetch('https://api.spacexdata.com/v5/launches', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const launches = await response.json();`}
                    </Code>
                  </Box>

                  <Box>
                    <Text weight={500} size="sm" color={SPACEX_COLORS.accent} mb={8}>
                      Python
                    </Text>
                    <Code
                      block
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: 8,
                        padding: 16,
                        '.mantine-Code-pre': {
                          color: SPACEX_COLORS.accent,
                        }
                      }}
                    >
{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.get('https://api.spacexdata.com/v5/launches', headers=headers)
launches = response.json()`}
                    </Code>
                  </Box>
                </Stack>
              </Paper>
            </Tabs.Panel>

            <Tabs.Panel value="authentication">
              <Paper
                p="xl"
                radius="md"
                sx={{
                  backgroundColor: SPACEX_COLORS.surface,
                  border: `1px solid ${SPACEX_COLORS.border}`,
                }}
              >
                <Stack spacing="xl">
                  <Title order={3} size="h4" color="white">
                    Authentication Guide
                  </Title>

                  <Text color="dimmed">
                    All API requests must include your API key in the Authorization header. 
                    The API uses Bearer token authentication.
                  </Text>

                  <Alert
                    icon={<Lock size={16} />}
                    color="blue"
                    radius="md"
                    sx={{
                      backgroundColor: 'rgba(0, 82, 136, 0.1)',
                      border: '1px solid rgba(0, 82, 136, 0.2)',
                    }}
                  >
                    <Text size="sm" weight={500} mb={8}>
                      Authorization Header
                    </Text>
                    <Code
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        color: SPACEX_COLORS.accent,
                      }}
                    >
                      Authorization: Bearer YOUR_API_KEY
                    </Code>
                  </Alert>

                  <Box>
                    <Text weight={500} size="sm" color={SPACEX_COLORS.accent} mb={8}>
                      Example Request with Authentication
                    </Text>
                    <Code
                      block
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: 8,
                        padding: 16,
                        '.mantine-Code-pre': {
                          color: SPACEX_COLORS.accent,
                        }
                      }}
                    >
{`curl -X GET \\
  'https://api.spacexdata.com/v5/launches' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`}
                    </Code>
                  </Box>
                </Stack>
              </Paper>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}