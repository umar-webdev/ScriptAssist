import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
  LoadingOverlay 
} from '@mantine/core';

export default function LaunchDetailPage() {
  const { id } = useParams();

  // Fetch launch details
  const { data: launch, isLoading: isLoadingLaunch } = useQuery({
    queryKey: ['launch', id],
    queryFn: async () => {
      const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
      return response.json();
    }
  });

  // Enrich with rocket details
  const { data: rocket, isLoading: isLoadingRocket } = useQuery({
    queryKey: ['rocket', launch?.rocket],
    enabled: !!launch?.rocket,
    queryFn: async () => {
      const response = await fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`);
      return response.json();
    }
  });

  const isLoading = isLoadingLaunch || isLoadingRocket;

  return (
    <Container size="xl" py="xl">
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading} />
        
        {launch && (
          <>
            <Title order={1} mb="xl">{launch.name}</Title>

            <Grid>
              <Grid.Col md={8}>
                <Paper p="md" withBorder>
                  <Image
                    src={launch.links?.patch?.large || 'https://placehold.co/900x300'}
                    alt={launch.name}
                    height={300}
                    fit="contain"
                  />
                  
                  <Text size="lg" mt="md">
                    {launch.details || 'No details available'}
                  </Text>

                  <Group mt="md">
                    <Badge color={launch.success ? 'green' : 'red'}>
                      {launch.success ? 'Successful' : 'Failed'}
                    </Badge>
                    <Badge color="blue">
                      {new Date(launch.date_utc).toLocaleDateString()}
                    </Badge>
                  </Group>
                </Paper>
              </Grid.Col>

              <Grid.Col md={4}>
                {rocket && (
                  <Paper p="md" withBorder>
                    <Title order={3} mb="md">Rocket Details</Title>
                    <Text><strong>Name:</strong> {rocket.name}</Text>
                    <Text><strong>Type:</strong> {rocket.type}</Text>
                    <Text><strong>Height:</strong> {rocket.height?.meters}m</Text>
                    <Text><strong>Mass:</strong> {rocket.mass?.kg}kg</Text>
                    <Text><strong>Success Rate:</strong> {rocket.success_rate_pct}%</Text>
                    <Text mt="sm">{rocket.description}</Text>
                  </Paper>
                )}
              </Grid.Col>
            </Grid>

            {launch.cores && (
              <Paper p="md" withBorder mt="xl">
                <Title order={3} mb="md">Mission Timeline</Title>
                <Timeline active={1} bulletSize={24} lineWidth={2}>
                  <Timeline.Item title="Launch Preparation">
                    <Text color="dimmed" size="sm">Pre-flight checks and fueling</Text>
                  </Timeline.Item>
                  <Timeline.Item title="Liftoff">
                    <Text color="dimmed" size="sm">
                      T+0: Main engine start and liftoff
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Main Engine Cutoff">
                    <Text color="dimmed" size="sm">
                      First stage separation and second stage ignition
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Landing">
                    <Text color="dimmed" size="sm">
                      {launch.cores[0]?.landing_success 
                        ? 'Successful landing' 
                        : 'Landing unsuccessful or not attempted'}
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Paper>
            )}
          </>
        )}
      </div>
    </Container>
  );
}