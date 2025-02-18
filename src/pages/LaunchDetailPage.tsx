import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Image,
  Timeline,
  LoadingOverlay,
  Stack,
  ActionIcon,
  Box,
  ThemeIcon,
  Transition,
  Tooltip,
  Breadcrumbs,
  Anchor,
  Skeleton,
} from "@mantine/core";
import {
  Rocket,
  Calendar,
  Users,
  Building2,
  MapPin,
  ArrowLeft,
  Timer,
  CheckCircle2,
  Gauge,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Launch, Rocket as RocketType, Launchpad } from "../types/launch";

export default function LaunchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch launch details
  const { data: launch, isLoading: isLoadingLaunch } = useQuery({
    queryKey: ["launch", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/launches/${id}`
      );
      return response.json() as Promise<Launch>;
    },
  });

  // Enrich with rocket details
  const { data: rocket, isLoading: isLoadingRocket } = useQuery({
    queryKey: ["rocket", launch?.rocket],
    enabled: !!launch?.rocket,
    queryFn: async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/rockets/${launch.rocket}`
      );
      return response.json() as Promise<RocketType>;
    },
  });

  // Fetch launchpad details
  const { data: launchpad, isLoading: isLoadingLaunchpad } = useQuery({
    queryKey: ["launchpad", launch?.launchpad],
    enabled: !!launch?.launchpad,
    queryFn: async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`
      );
      return response.json() as Promise<Launchpad>;
    },
  });

  const isLoading = isLoadingLaunch || isLoadingRocket || isLoadingLaunchpad;

  const items = [
    { title: "Launches", href: "/launchlist" },
    { title: launch?.name || "Loading...", href: "#" },
  ].map((item, index) => (
    <Anchor
      key={index}
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        if (item.href !== "#") navigate(item.href);
      }}
    >
      {item.title}
    </Anchor>
  ));

  const LoadingSection = () => (
    <Box py="xl">
      <Stack spacing="md">
        <Skeleton height={50} radius="md" />
        <Skeleton height={200} radius="md" />
        <Skeleton height={100} radius="md" />
      </Stack>
    </Box>
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0c14 0%, #1a1f35 100%)",
        }}
      >
        <Container size="xl" py="xl">
          <LoadingSection />
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0c14 0%, #1a1f35 100%)",
      }}
    >
      <Container size="xl" py="xl">
        <div style={{ position: "relative" }}>
          <LoadingOverlay visible={isLoading} overlayBlur={2} />

          {launch && (
            <Transition
              mounted={mounted}
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Stack spacing="xl" style={styles}>
                  <Group position="apart" align="center">
                    <Group spacing="xs">
                      <ActionIcon
                        variant="light"
                        onClick={() => navigate("/launchlist")}
                        size="lg"
                        radius="md"
                      >
                        <ArrowLeft size={20} />
                      </ActionIcon>
                      <Box>
                        <Breadcrumbs>{items}</Breadcrumbs>
                        <Title order={1} mt="xs">
                          {launch.name}
                        </Title>
                      </Box>
                    </Group>
                    <Group spacing="xs">
                      <Badge
                        size="lg"
                        variant={launch.success === null ? "outline" : "filled"}
                        color={launch.success ? "green" : "red"}
                      >
                        {launch.success ? "Successful Launch" : "Launch Failed"}
                      </Badge>
                      {launch.upcoming && (
                        <Badge size="lg" variant="dot" color="yellow">
                          Upcoming
                        </Badge>
                      )}
                    </Group>
                  </Group>

                  <Grid>
                    <Grid.Col md={8}>
                      <Stack spacing="md">
                        {/* Mission Patch and Details */}
                        <Paper p="xl" radius="md" withBorder>
                          <Grid>
                            <Grid.Col sm={4}>
                              <Image
                                src={
                                  launch.links?.patch?.large ||
                                  "/placeholder-patch.png"
                                }
                                alt={launch.name}
                                fit="contain"
                                height={200}
                                withPlaceholder
                                sx={{
                                  img: {
                                    filter:
                                      "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))",
                                  },
                                }}
                              />
                            </Grid.Col>
                            <Grid.Col sm={8}>
                              <Stack spacing="md">
                                <Box>
                                  <Text size="sm" color="dimmed" mb={4}>
                                    Mission Overview
                                  </Text>
                                  <Text size="lg">
                                    {launch.details ||
                                      "No mission details available."}
                                  </Text>
                                </Box>

                                <Group spacing="lg">
                                  <Group spacing="xs">
                                    <ThemeIcon
                                      color="blue"
                                      size="lg"
                                      radius="md"
                                    >
                                      <Calendar size={20} />
                                    </ThemeIcon>
                                    <Box>
                                      <Text size="sm" color="dimmed">
                                        Launch Date
                                      </Text>
                                      <Text>
                                        {new Date(
                                          launch.date_utc
                                        ).toLocaleDateString(undefined, {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </Text>
                                    </Box>
                                  </Group>

                                  <Group spacing="xs">
                                    <ThemeIcon
                                      color="violet"
                                      size="lg"
                                      radius="md"
                                    >
                                      <Users size={20} />
                                    </ThemeIcon>
                                    <Box>
                                      <Text size="sm" color="dimmed">
                                        Crew Size
                                      </Text>
                                      <Text>
                                        {launch.crew?.length || "No"} crew
                                        members
                                      </Text>
                                    </Box>
                                  </Group>
                                </Group>
                              </Stack>
                            </Grid.Col>
                          </Grid>
                        </Paper>

                        {/* Launch Timeline */}
                        <Paper p="xl" radius="md" withBorder>
                          <Title order={3} mb="lg">
                            Mission Timeline
                          </Title>
                          <Timeline active={1} bulletSize={24} lineWidth={2}>
                            <Timeline.Item
                              bullet={<CheckCircle2 size={16} />}
                              title="Pre-launch Operations"
                            >
                              <Text color="dimmed" size="sm">
                                Final systems check and weather verification
                              </Text>
                              <Text size="xs" mt={4} color="dimmed">
                                T-1 hour
                              </Text>
                            </Timeline.Item>

                            <Timeline.Item
                              bullet={<Rocket size={16} />}
                              title="Liftoff"
                            >
                              <Text color="dimmed" size="sm">
                                Main engine start and liftoff
                              </Text>
                              <Text size="xs" mt={4} color="dimmed">
                                T+0
                              </Text>
                            </Timeline.Item>

                            <Timeline.Item
                              bullet={<Gauge size={16} />}
                              title="Main Engine Cutoff"
                            >
                              <Text color="dimmed" size="sm">
                                First stage separation and second stage ignition
                              </Text>
                              <Text size="xs" mt={4} color="dimmed">
                                T+2 minutes 30 seconds
                              </Text>
                            </Timeline.Item>

                            <Timeline.Item
                              bullet={<Timer size={16} />}
                              title="Deployment"
                            >
                              <Text color="dimmed" size="sm">
                                Payload deployment sequence
                              </Text>
                              <Text size="xs" mt={4} color="dimmed">
                                T+1 hour
                              </Text>
                            </Timeline.Item>
                          </Timeline>
                        </Paper>
                      </Stack>
                    </Grid.Col>

                    <Grid.Col md={4}>
                      <Stack spacing="md">
                        {/* Rocket Details */}
                        {rocket && (
                          <Paper p="xl" radius="md" withBorder>
                            <Group position="apart" mb="md">
                              <Title order={3}>Rocket Details</Title>
                              <ThemeIcon size="lg" radius="md">
                                <Rocket size={20} />
                              </ThemeIcon>
                            </Group>

                            <Stack spacing="md">
                              <Group spacing="xs">
                                <ThemeIcon
                                  color="gray"
                                  size="lg"
                                  radius="md"
                                  variant="light"
                                >
                                  <Building2 size={20} />
                                </ThemeIcon>
                                <Box>
                                  <Text size="sm" color="dimmed">
                                    Vehicle
                                  </Text>
                                  <Text weight={500}>{rocket.name}</Text>
                                </Box>
                              </Group>

                              <Box>
                                <Text size="sm" color="dimmed" mb={4}>
                                  Success Rate
                                </Text>
                                <Badge size="lg" radius="md">
                                  {rocket.success_rate_pct}% Success Rate
                                </Badge>
                              </Box>

                              <Text size="sm" mt="xs">
                                {rocket.description}
                              </Text>
                            </Stack>
                          </Paper>
                        )}

                        {/* Launch Site Details */}
                        {launchpad && (
                          <Paper p="xl" radius="md" withBorder>
                            <Group position="apart" mb="md">
                              <Title order={3}>Launch Site</Title>
                              <ThemeIcon size="lg" radius="md">
                                <MapPin size={20} />
                              </ThemeIcon>
                            </Group>

                            <Stack spacing="md">
                              <Text weight={500}>{launchpad.name}</Text>
                              <Text size="sm" color="dimmed">
                                {launchpad.locality}, {launchpad.region}
                              </Text>

                              <Box>
                                <Text size="sm" color="dimmed" mb={4}>
                                  Status
                                </Text>
                                <Badge
                                  size="lg"
                                  color={
                                    launchpad.status === "active"
                                      ? "green"
                                      : "gray"
                                  }
                                >
                                  {launchpad.status.charAt(0).toUpperCase() +
                                    launchpad.status.slice(1)}
                                </Badge>
                              </Box>

                              <Text size="sm">{launchpad.details}</Text>
                            </Stack>
                          </Paper>
                        )}
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Stack>
              )}
            </Transition>
          )}
        </div>
      </Container>
    </Box>
  );
}
