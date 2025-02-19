import React, { useState } from "react";
import {
  Text,
  Container,
  Group,
  Button,
  Box,
  Burger,
  Stack,
} from "@mantine/core";
interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "OVERVIEW", href: "#home" },
    { label: "FEATURES", href: "#features" },
    { label: "ENDPOINTS", href: "#endpoints" },
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
