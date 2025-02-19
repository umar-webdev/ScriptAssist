import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";

export const Footer = () => {
  const footerSections = [
    {
      title: "SPACEX API",
      items: ["The official SpaceX API provides programmatic access to launch data, vehicle information, and mission details."],
      isDescription: true,
    },
    {
      title: "API RESOURCES",
      items: ["Documentation", "Endpoints", "Authentication", "Rate Limits"],
    },
    {
      title: "DEVELOPERS",
      items: ["Getting Started", "API Reference", "Examples", "Libraries"],
    },
    {
      title: "LEGAL",
      items: ["Terms of Service", "Privacy Policy", "Security", "Support"],
    },
  ];

  return (
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
          {footerSections.map((section) => (
            <Stack key={section.title} spacing={16}>
              <Text 
                weight={section.isDescription ? 700 : 600} 
                color="white" 
                size="sm"
              >
                {section.title}
              </Text>
              {section.items.map((item) => (
                <Text
                  key={item}
                  color="dimmed"
                  size="sm"
                  sx={
                    !section.isDescription
                      ? {
                          cursor: "pointer",
                          "&:hover": { color: "white" },
                        }
                      : {}
                  }
                >
                  {item}
                </Text>
              ))}
            </Stack>
          ))}
        </SimpleGrid>
        <Text color="dimmed" size="sm" align="center" mt={80}>
          © {new Date().getFullYear()} Space Exploration Technologies Corp.
        </Text>
      </Container>
    </Box>
  );
};

