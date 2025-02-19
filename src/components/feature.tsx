import React from 'react';
import {
  Title,
  Text,
  Group,
  Badge,
  Card,
  Paper,
  Code,
  Box,
  Stack,
} from "@mantine/core";

interface ApiExampleCardProps {
  endpoint: string;
  method: string;
  description: string;
  example: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Endpoint {
  path: string;
  method: string;
  desc: string;
}

interface CategoryEndpoints {
  title: string;
  endpoints: Endpoint[];
}

interface EndpointCategoryCardProps {
  category: CategoryEndpoints;
}

export const ApiExampleCard: React.FC<ApiExampleCardProps> = ({ 
  endpoint, 
  method, 
  description, 
  example 
}) => (
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

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description 
}) => (
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

export const EndpointCategoryCard: React.FC<EndpointCategoryCardProps> = ({ 
  category 
}) => (
  <Card
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
);