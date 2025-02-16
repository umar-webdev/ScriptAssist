import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TextInput, 
  Paper, 
  Title, 
  Badge, 
  LoadingOverlay,
  Text,
  Stack,
  Group,
  Tooltip
} from '@mantine/core';
import { useAppStore } from '../store/app.store';
import { LaunchFilters } from '../components/LaunchFilters';

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  flight_number: number;
  crew: any[];
  rocket: string;
  upcoming: boolean;
}

export default function LaunchListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { selectedLaunchFilters, selectedYear } = useAppStore();

  // Fetch launches and rockets data
  const { data: launches, isLoading } = useQuery({
    queryKey: ['launches'],
    queryFn: async () => {
      const response = await fetch('https://api.spacexdata.com/v5/launches');
      return response.json();
    }
  });

  const { data: rockets } = useQuery({
    queryKey: ['rockets'],
    queryFn: async () => {
      const response = await fetch('https://api.spacexdata.com/v5/rockets');
      return response.json();
    }
  });

  // Create rocket ID to name mapping
  const rocketNames = rockets?.reduce((acc: Record<string, string>, rocket: any) => {
    acc[rocket.id] = rocket.name;
    return acc;
  }, {});

  const filteredLaunches = launches?.filter((launch: Launch) => {
    const matchesSearch = search === '' || 
      launch.name.toLowerCase().includes(search.toLowerCase());

    const matchesYear = !selectedYear || 
      new Date(launch.date_utc).getFullYear().toString() === selectedYear;

    const matchesSuccess = selectedLaunchFilters.success === null || 
      launch.success === selectedLaunchFilters.success;

    const matchesCrew = selectedLaunchFilters.withCrew === null ||
      (selectedLaunchFilters.withCrew ? launch.crew?.length > 0 : true);

    return matchesSearch && matchesYear && matchesSuccess && matchesCrew;
  });

  const sortedLaunches = [...(filteredLaunches || [])].sort((a: Launch, b: Launch) => 
    new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
  );

  return (
    <Stack spacing="md">
      <Group position="apart">
        <Title order={2}>SpaceX Launches</Title>
        <Badge size="lg">Total: {sortedLaunches.length}</Badge>
      </Group>

      <TextInput
        placeholder="Search missions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <LaunchFilters />

      <Paper p="md" radius="md" withBorder>
        <div style={{ position: 'relative', minHeight: 200 }}>
          <LoadingOverlay visible={isLoading} />
          
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Flight #</th>
                <th>Mission Name</th>
                <th>Launch Date</th>
                <th>Status</th>
                <th>Crew</th>
                <th>Rocket</th>
              </tr>
            </thead>
            <tbody>
              {sortedLaunches?.map((launch: Launch) => (
                <tr 
                  key={launch.id}
                  onClick={() => navigate(`/launches/${launch.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{launch.flight_number}</td>
                  <td>
                    <Group spacing="xs">
                      <Text weight={500}>{launch.name}</Text>
                      {launch.upcoming && (
                        <Badge size="sm" variant="dot">Upcoming</Badge>
                      )}
                    </Group>
                  </td>
                  <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
                  <td>
                    <Badge 
                      color={launch.success === true ? 'green' : 
                             launch.success === false ? 'red' : 'gray'}
                    >
                      {launch.success === true ? 'Success' : 
                       launch.success === false ? 'Failed' : 'Unknown'}
                    </Badge>
                  </td>
                  <td>
                    <Badge color={launch.crew?.length ? 'blue' : 'gray'}>
                      {launch.crew?.length ? `${launch.crew.length} crew` : 'No crew'}
                    </Badge>
                  </td>
                  <td>
                    <Tooltip 
                      label={rocketNames?.[launch.rocket] || 'Loading rocket info...'}
                      withArrow
                    >
                      <Badge variant="dot" color="grape">
                        {launch.rocket}
                      </Badge>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {sortedLaunches?.length === 0 && (
            <Text color="dimmed" align="center" mt="xl">
              No launches found matching your filters
            </Text>
          )}
        </div>
      </Paper>
    </Stack>
  );
}