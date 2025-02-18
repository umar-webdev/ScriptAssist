import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Grid,
  Paper,
  Text,
  Box,
  Container,
  Group,
  RingProgress,
  Stack,
  Badge,
  Skeleton,
  SimpleGrid,
  Title,
  ScrollArea,
} from '@mantine/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from '@mantine/hooks';
import { 
  Rocket, 
  Users, 
  Calendar,
  TrendingUp,
  Activity,
  CheckCircle2,
  XCircle,
  Clock
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

const MetricCard = ({ title, value, icon: Icon, color, loading, secondaryValue }) => (
  <Paper
    p="md"
    radius="md"
    sx={{
      backgroundColor: SPACEX_COLORS.surface,
      border: `1px solid ${SPACEX_COLORS.border}`,
      height: '100%',
    }}
  >
    {loading ? (
      <Stack>
        <Skeleton height={24} width="60%" />
        <Skeleton height={36} width="40%" />
      </Stack>
    ) : (
      <Stack justify="space-between" h="100%">
        <Group position="apart" mb="xs">
          <Text size="sm" color="dimmed" weight={500}>
            {title}
          </Text>
          <Icon size={20} color={color || SPACEX_COLORS.accent} />
        </Group>
        <Group position="apart" align="flex-end">
          <Text weight={700} size="xl" color="white">
            {value}
          </Text>
          {secondaryValue && (
            <Badge 
              variant="filled" 
              color="green"
              radius="sm"
              sx={{ textTransform: 'none' }}
            >
              +{secondaryValue}% vs last month
            </Badge>
          )}
        </Group>
      </Stack>
    )}
  </Paper>
);

const StatusCard = ({ success, failed, pending, loading }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Paper
      p={isMobile ? "md" : "xl"}
      radius="md"
      sx={{
        backgroundColor: SPACEX_COLORS.surface,
        border: `1px solid ${SPACEX_COLORS.border}`,
        height: '100%',
      }}
    >
      {loading ? (
        <Skeleton height={180} />
      ) : (
        <Stack justify="space-between" h="100%">
          <Stack spacing="xs">
            <Text size="sm" color="dimmed" weight={500}>
              Launch Success Rate
            </Text>
            <Text size="xl" weight={700} color="white">
              {((success / (success + failed)) * 100).toFixed(1)}%
            </Text>
            <Group spacing={isMobile ? "xs" : "lg"} mt="md">
              <Group spacing="xs">
                <CheckCircle2 size={16} color={SPACEX_COLORS.success} />
                <Text size="sm" color="dimmed">{success} Successful</Text>
              </Group>
              <Group spacing="xs">
                <XCircle size={16} color={SPACEX_COLORS.error} />
                <Text size="sm" color="dimmed">{failed} Failed</Text>
              </Group>
              <Group spacing="xs">
                <Clock size={16} color={SPACEX_COLORS.warning} />
                <Text size="sm" color="dimmed">{pending} Pending</Text>
              </Group>
            </Group>
          </Stack>

          <Box mt="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
            <RingProgress
              size={isMobile ? 100 : 120}
              thickness={12}
              sections={[
                { value: (success / (success + failed)) * 100, color: SPACEX_COLORS.success },
                { value: (failed / (success + failed)) * 100, color: SPACEX_COLORS.error },
              ]}
              label={
                <Text color="white" weight={700} align="center" size="lg">
                  {success + failed}
                </Text>
              }
            />
          </Box>
        </Stack>
      )}
    </Paper>
  );
};

export default function DashboardPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Query and data fetching
  const { data: launches, isLoading: launchesLoading } = useQuery({
    queryKey: ['launches'],
    queryFn: async () => {
      const response = await fetch('https://api.spacexdata.com/v5/launches');
      return response.json();
    }
  });

  // Calculate metrics
  const metrics = launches?.reduce((acc, launch) => {
    // Update success/failure counts
    if (launch.success === true) acc.successful++;
    else if (launch.success === false) acc.failed++;
    else acc.pending++;

    // Count crew missions
    if (launch.crew?.length > 0) acc.crewMissions++;

    // Track monthly launches
    const month = new Date(launch.date_utc).toISOString().slice(0, 7);
    acc.monthlyLaunches[month] = (acc.monthlyLaunches[month] || 0) + 1;

    return acc;
  }, { 
    successful: 0, 
    failed: 0, 
    pending: 0,
    crewMissions: 0,
    monthlyLaunches: {}
  }) || {};

  // Prepare chart data
  const chartData = Object.entries(metrics.monthlyLaunches || {})
    .slice(-12)
    .map(([month, count]) => ({
      month: month.slice(5), // Show only MM-YYYY
      launches: count
    }));

  return (
    <ScrollArea>
      <Box p={isMobile ? "md" : "xl"}>
        <Container size="xl">
          <Stack spacing={isMobile ? "lg" : "xl"}>
            {/* Header */}
            <Box mb={isMobile ? "md" : "lg"}>
              <Title 
                order={2} 
                size={isMobile ? 24 : 28} 
                weight={600} 
                color="white" 
                mb={8}
              >
                Mission Control
              </Title>
              <Text color="dimmed" size={isMobile ? "sm" : "md"}>
                Real-time overview of SpaceX launch operations and mission statistics
              </Text>
            </Box>

            {/* Metrics Grid */}
            <SimpleGrid
              cols={4}
              spacing={isMobile ? "md" : "lg"}
              breakpoints={[
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'xs', cols: 1 },
              ]}
            >
              <MetricCard
                title="Total Launches"
                value={launches?.length || 0}
                icon={Rocket}
                loading={launchesLoading}
                secondaryValue={15}
              />
              <MetricCard
                title="Crew Missions"
                value={metrics.crewMissions || 0}
                icon={Users}
                loading={launchesLoading}
                secondaryValue={8}
              />
              <MetricCard
                title="This Month"
                value={chartData[chartData.length - 1]?.launches || 0}
                icon={Calendar}
                loading={launchesLoading}
              />
              <MetricCard
                title="Success Rate"
                value={`${((metrics.successful / (metrics.successful + metrics.failed)) * 100).toFixed(1)}%`}
                icon={Activity}
                color={SPACEX_COLORS.success}
                loading={launchesLoading}
              />
            </SimpleGrid>

            {/* Charts Section */}
            <Grid gutter={isMobile ? "md" : "lg"}>
              <Grid.Col span={isMobile ? 12 : 8}>
                <Paper
                  p={isMobile ? "md" : "xl"}
                  radius="md"
                  sx={{
                    backgroundColor: SPACEX_COLORS.surface,
                    border: `1px solid ${SPACEX_COLORS.border}`,
                    height: '100%',
                  }}
                >
                  <Stack spacing="lg">
                    <Group position="apart">
                      <Stack spacing={4}>
                        <Text size="sm" color="dimmed" weight={500}>
                          Launch Frequency
                        </Text>
                        <Text size="lg" weight={700} color="white">
                          {chartData.reduce((sum, { launches }) => sum + launches, 0)} launches in the last year
                        </Text>
                      </Stack>
                      <TrendingUp size={20} color={SPACEX_COLORS.success} />
                    </Group>
                    
                    <Box sx={{ height: isMobile ? 200 : 300, width: '100%' }}>
                      {launchesLoading ? (
                        <Skeleton height="100%" />
                      ) : (
                        <ResponsiveContainer>
                          <LineChart 
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <CartesianGrid 
                              strokeDasharray="3 3" 
                              stroke={SPACEX_COLORS.border} 
                              vertical={false}
                            />
                            <XAxis 
                              dataKey="month" 
                              stroke={SPACEX_COLORS.accent}
                              tick={{ fill: SPACEX_COLORS.accent, fontSize: 12 }}
                              tickMargin={10}
                            />
                            <YAxis 
                              stroke={SPACEX_COLORS.accent}
                              tick={{ fill: SPACEX_COLORS.accent, fontSize: 12 }}
                              tickMargin={10}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: SPACEX_COLORS.surface,
                                border: `1px solid ${SPACEX_COLORS.border}`,
                                borderRadius: 4,
                              }}
                              labelStyle={{ color: 'white', marginBottom: 4 }}
                              itemStyle={{ color: SPACEX_COLORS.accent }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="launches" 
                              stroke={SPACEX_COLORS.primary}
                              strokeWidth={2}
                              dot={{ fill: SPACEX_COLORS.primary, r: 4 }}
                              activeDot={{ r: 6, fill: SPACEX_COLORS.primary }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </Box>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={isMobile ? 12 : 4}>
                <StatusCard 
                  success={metrics.successful}
                  failed={metrics.failed}
                  pending={metrics.pending}
                  loading={launchesLoading}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </ScrollArea>
  );
}