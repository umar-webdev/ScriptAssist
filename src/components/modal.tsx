import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Text,
  Group,
  Button,
  Box,
  Code,
  Modal,
  TextInput,
  Stack,
  PasswordInput,
  MantineNumberSize,
  ModalProps,
} from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";

interface StyleObject {
  [key: string]: {
    [key: string]: string | number | object;
  };
}

const modalStyles: StyleObject = {
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
};

const inputStyles: StyleObject = {
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
};

interface ModalComponentProps {
  opened: boolean;
  onClose: () => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  email: string;
  confirmPassword: string;
}

interface User {
  username: string;
  password: string;
  email?: string;
  apiKey?: string;
}

export const LoginModal: React.FC<ModalComponentProps> = ({ opened, onClose }) => {
  const [formData, setFormData] = useState<LoginFormData>({ 
    username: "", 
    password: "" 
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    // Check for demo account first
    if (formData.username === 'demo' && formData.password === 'spacex2024') {
      const demoUser: User = {
        username: 'demo',
        password: 'spacex2024',
        apiKey: 'sx-demo-' + Math.random().toString(36).substring(2, 15)
      };
      localStorage.setItem("currentUser", JSON.stringify(demoUser));
      onClose();
      navigate("/dashboard");
      return;
    }

    // Check for registered users
    const user = users.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      onClose();
      navigate("/dashboard");
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
      styles={modalStyles}
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
              styles={inputStyles}
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
                ...inputStyles,
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

export const RegisterModal: React.FC<ModalComponentProps> = ({ opened, onClose }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.username === formData.username)) {
      setError("Username already exists");
      return;
    }

    if (users.some((u) => u.email === formData.email)) {
      setError("Email already registered");
      return;
    }

    const newUser: User = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      apiKey: "sx-" + Math.random().toString(36).substring(2, 15),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    onClose();
    navigate("/dashboard");
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
      styles={modalStyles}
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
              styles={inputStyles}
            />

            <TextInput
              required
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              styles={inputStyles}
            />

            <PasswordInput
              required
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              styles={{
                ...inputStyles,
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
                ...inputStyles,
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