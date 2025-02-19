import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TextInput,
  Title,
  Badge,
  LoadingOverlay,
  Text,
  Group,
  Box,
  Container,
  Button,
  ActionIcon,
  Popover,
  Stack,
  Select,
  Skeleton,
  Paper,
  ScrollArea,
  Transition,
  Menu,
  MantineNumberSize,
} from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { 
  Search, 
  Rocket, 
  Calendar, 
  Users, 
  Filter, 
  FilterX,
  ChevronRight,
  ChevronUp,
  Settings,
  CalendarDays,
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
} as const;

interface Launch {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  crew?: Array<any>;
  rocket: string;
}

interface Rocket {
  id: string;
  name: string;
}

interface RocketNames {
  [key: string]: string;
}

interface LaunchCardProps {
  launch: Launch;
  rocketName?: string;
  onClick: () => void;
}

interface TableRowProps {
  launch: Launch;
  rocketName?: string;
  onClick: () => void;
}

interface FiltersPopoverProps {
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedCrew: string;
  setSelectedCrew: (value: string) => void;
  onReset: () => void;
  hasFilters: boolean;
}

// LaunchCard Component for Mobile View
const LaunchCard: React.FC<LaunchCardProps> = ({ launch, rocketName, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      p="md"
      radius="md"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        backgroundColor: SPACEX_COLORS.surface,
        border: `1px solid ${SPACEX_COLORS.border}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: SPACEX_COLORS.primary,
        }
      }}
    >
      <Stack spacing="md">
        <Group position="apart" align="flex-start">
          <Box>
            <Group spacing="xs" mb={4}>
              <Text weight={500} color="white">
                #{launch.flight_number}
              </Text>
              <Text weight={600} size="lg" color="white">
                {launch.name}
              </Text>
            </Group>
            {launch.upcoming && (
              <Badge 
                variant="filled"
                radius="sm"
                sx={{
                  backgroundColor: 'rgba(255, 193, 7, 0.2)',
                  color: SPACEX_COLORS.warning,
                  textTransform: 'none',
                  border: '1px solid rgba(255, 193, 7, 0.2)',
                }}
              >
                Upcoming
              </Badge>
            )}
          </Box>
          <ChevronRight 
            size={16} 
            style={{
              transition: 'transform 0.2s ease',
              transform: isHovered ? 'translateX(4px)' : 'none',
            }}
          />
        </Group>

        <Stack spacing="sm">
          <Group spacing="xs">
            <Calendar size={16} color={SPACEX_COLORS.accent} />
            <Text color="dimmed" size="sm">
              {new Date(launch.date_utc).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </Group>

          <Group spacing="xs">
            <Badge
              variant="dot"
              radius="sm"
              size="lg"
              sx={{
                textTransform: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: launch.success === true ? SPACEX_COLORS.success :
                      launch.success === false ? SPACEX_COLORS.error :
                      SPACEX_COLORS.accent,
              }}
            >
              {launch.success === true ? 'Successful' :
               launch.success === false ? 'Failed' : 'Unknown'}
            </Badge>

            <Badge
              variant="filled"
              radius="sm"
              leftSection={<Users size={14} />}
              sx={{
                backgroundColor: launch.crew?.length ? 
                  'rgba(0, 82, 136, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: launch.crew?.length ? 
                  SPACEX_COLORS.primary : SPACEX_COLORS.accent,
                textTransform: 'none',
                border: launch.crew?.length ?
                  '1px solid rgba(0, 82, 136, 0.2)' : 'none',
              }}
            >
              {launch.crew?.length ? `${launch.crew.length} Crew` : 'No Crew'}
            </Badge>

            <Badge
              variant="dot"
              radius="sm"
              leftSection={<Rocket size={14} />}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                textTransform: 'none',
              }}
            >
              {rocketName || 'Loading...'}
            </Badge>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

// Table Row Component
const TableRow: React.FC<TableRowProps> = ({ launch, rocketName, onClick }) => (
  <tr 
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <td>
      <Text weight={500} color="white">#{launch.flight_number}</Text>
    </td>
    <td>
      <Group spacing="xs" noWrap>
        <Text weight={500} color="white">{launch.name}</Text>
        {launch.upcoming && (
          <Badge 
            variant="filled"
            radius="sm"
            px={8}
            sx={{
              backgroundColor: 'rgba(255, 193, 7, 0.2)',
              color: SPACEX_COLORS.warning,
              textTransform: 'none',
              border: '1px solid rgba(255, 193, 7, 0.2)',
            }}
          >
            Upcoming
          </Badge>
        )}
      </Group>
    </td>
    <td>
      <Group spacing="xs" noWrap>
        <Calendar size={16} color={SPACEX_COLORS.accent} />
        <Text color="dimmed">
          {new Date(launch.date_utc).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Text>
      </Group>
    </td>
    <td>
      <Badge
        variant="dot"
        radius="sm"
        size="lg"
        sx={{
          textTransform: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: launch.success === true ? SPACEX_COLORS.success :
                launch.success === false ? SPACEX_COLORS.error :
                SPACEX_COLORS.accent,
        }}
      >
        {launch.success === true ? 'Successful' :
         launch.success === false ? 'Failed' : 'Unknown'}
      </Badge>
    </td>
    <td>
      <Group spacing="xs" noWrap>
        <Users size={16} color={SPACEX_COLORS.accent} />
        <Badge
          variant="filled"
          radius="sm"
          sx={{
            backgroundColor: launch.crew?.length ? 
              'rgba(0, 82, 136, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: launch.crew?.length ? 
              SPACEX_COLORS.primary : SPACEX_COLORS.accent,
            textTransform: 'none',
            border: launch.crew?.length ?
              '1px solid rgba(0, 82, 136, 0.2)' : 'none',
          }}
        >
          {launch.crew?.length ? `${launch.crew.length} Crew` : 'No Crew'}
        </Badge>
      </Group>
    </td>
    <td>
      <Group spacing="xs" noWrap>
        <Rocket size={16} color={SPACEX_COLORS.accent} />
        <Badge
          variant="dot"
          radius="sm"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            textTransform: 'none',
          }}
        >
          {rocketName || 'Loading...'}
        </Badge>
      </Group>
    </td>
    <td>
      <ActionIcon 
        variant="subtle" 
        color="gray"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <ChevronRight size={16} />
      </ActionIcon>
    </td>
  </tr>
);

// Filters Component
const FiltersPopover: React.FC<FiltersPopoverProps> = ({ 
  selectedYear,
  setSelectedYear,
  selectedStatus,
  setSelectedStatus,
  selectedCrew,
  setSelectedCrew,
  onReset,
  hasFilters
}) => (
  <Stack spacing="md">
    <Select
      label="Launch Year"
      placeholder="All years"
      value={selectedYear}
      onChange={setSelectedYear}
      data={[
        { value: '', label: 'All years' },
        ...Array.from({ length: 11 }, (_, i) => {
          const year = (2013 + i).toString();
          return { value: year, label: year };
        })
      ]}
      styles={{
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
        },
        label: { color: 'white' },
        item: {
          color: 'white',
          '&[data-selected]': {
            backgroundColor: SPACEX_COLORS.primary,
          },
        },
      }}
    />

    <Select
      label="Launch Status"
      placeholder="All statuses"
      value={selectedStatus}
      onChange={setSelectedStatus}
      data={[
        { value: '', label: 'All statuses' },
        { value: 'success', label: 'Successful' },
        { value: 'failed', label: 'Failed' },
        { value: 'unknown', label: 'Unknown' }
      ]}
      styles={{
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
        },
        label: { color: 'white' },
      }}
    />

    <Select
      label="Crew Filter"
      placeholder="All missions"
      value={selectedCrew}
      onChange={setSelectedCrew}
      data={[
        { value: '', label: 'All missions' },
        { value: 'crew', label: 'Crewed missions' },
        { value: 'no-crew', label: 'Uncrewed missions' }
      ]}
      styles={{
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
        },
        label: { color: 'white' },
      }}
    />

    {hasFilters && (
      <Button
        variant="subtle"
        color="gray"
        leftIcon={<FilterX size={16} />}
        onClick={onReset}
        sx={{
          color: 'black',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.64)',
          }
        }}
      >
        Reset Filters
      </Button>
    )}
  </Stack>
);

const LaunchListPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterOpened, { toggle: toggleFilter, close: closeFilter }] = useDisclosure(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCrew, setSelectedCrew] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Data fetching
  const { data: launches, isLoading: launchesLoading } = useQuery<Launch[]>({
    queryKey: ['launches'],
    queryFn: async () => {
      const response = await fetch('https://api.spacexdata.com/v5/launches');
      if (!response.ok) throw new Error('Failed to fetch launches');
      return response.json();
    }
  });

  const { data: rockets, isLoading: rocketsLoading } = useQuery<Rocket[]>({
    queryKey: ['rockets'],
    queryFn: async () => {
      const response = await fetch('https://api.spacexdata.com/v5/rockets');
      if (!response.ok) throw new Error('Failed to fetch rockets');
      return response.json();
    }
  });

  const isLoading = launchesLoading || rocketsLoading;
  const hasActiveFilters = selectedYear || selectedStatus || selectedCrew;

  // Process data
  const rocketNames: RocketNames = rockets?.reduce((acc: RocketNames, rocket) => {
    acc[rocket.id] = rocket.name;
    return acc;
  }, {}) || {};

  const filteredLaunches = launches?.filter(launch => {
    const matchesSearch = search === '' || 
      launch.name.toLowerCase().includes(search.toLowerCase());

    const matchesYear = !selectedYear || 
      new Date(launch.date_utc).getFullYear().toString() === selectedYear;

    const matchesStatus = !selectedStatus || 
      (selectedStatus === 'success' && launch.success === true) ||
      (selectedStatus === 'failed' && launch.success === false) ||
      (selectedStatus === 'unknown' && launch.success === null);

      const matchesCrew = !selectedCrew ||
      (selectedCrew === 'crew' && launch.crew && launch.crew.length > 0) ||
      (selectedCrew === 'no-crew' && (!launch.crew || (launch.crew && launch.crew.length === 0)));

    return matchesSearch && matchesYear && matchesStatus && matchesCrew;
  });

  const sortedLaunches = [...(filteredLaunches || [])].sort((a, b) => 
    new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
  );

  const resetFilters = () => {
    setSelectedYear('');
    setSelectedStatus('');
    setSelectedCrew('');
    closeFilter();
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: SPACEX_COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          borderBottom: `1px solid ${SPACEX_COLORS.border}`,
          background: scrolled ? 
            'rgba(11, 14, 17, 0.95)' : 
            'linear-gradient(180deg, rgba(20, 22, 25, 0.8) 0%, rgba(11, 14, 17, 0) 100%)',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container size="xl" px={isMobile ? "md" : "xl"}>
          <Box py={scrolled ? "md" : "xl"}>
            <Group position="apart" align="flex-start">
              <Stack spacing={4}>
                <Title 
                  order={1} 
                  sx={{ 
                    color: 'white',
                    fontSize: isMobile ? 24 : 32,
                    fontWeight: 600,
                  }}
                >
                  SpaceX Launches
                </Title>
                <Text color="dimmed" size={isMobile ? "xs" : "sm"}>
                  Tracking the journey to space, one mission at a time
                </Text>
              </Stack>
              
              <Badge 
                variant="filled"
                size={isMobile ? "md" : "lg"}
                radius="sm"
                px="md"
                sx={{
                  backgroundColor: SPACEX_COLORS.primary,
                  textTransform: 'none',
                  fontSize: isMobile ? 12 : 14,
                }}
              >
                {sortedLaunches?.length || 0} Missions
              </Badge>
            </Group>
          </Box>

          {/* Search and Filters */}
          <Paper 
            p={isMobile ? "xs" : "md"}
            radius="sm"
            mb="xl"
            sx={{
              backgroundColor: scrolled ? 
                'rgba(20, 22, 25, 0.95)' : 
                SPACEX_COLORS.surface,
              border: `1px solid ${SPACEX_COLORS.border}`,
              transition: 'all 0.3s ease',
            }}
          >
            <Group position="apart" spacing="md">
              <TextInput
                placeholder="Search missions..."
                icon={<Search size={16} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ flex: 1 }}
                styles={{
                  input: {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${SPACEX_COLORS.border}`,
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:focus': {
                      borderColor: SPACEX_COLORS.primary,
                    },
                  },
                }}
              />

              <Popover
                opened={filterOpened}
                onChange={toggleFilter}
                position="bottom-end"
                shadow="md"
                width={300}
              >
                <Popover.Target>
                  <Button
                    variant={hasActiveFilters ? "filled" : "default"}
                    leftIcon={hasActiveFilters ? <Filter size={16} /> : <Settings size={16} />}
                    onClick={toggleFilter}
                    sx={{
                      backgroundColor: hasActiveFilters ? 
                        SPACEX_COLORS.primary : 
                        'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${SPACEX_COLORS.border}`,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: hasActiveFilters ? 
                          'rgba(0, 82, 136, 0.8)' : 
                          'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {hasActiveFilters ? 'Filters Active' : 'Filters'}
                  </Button>
                </Popover.Target>

                <Popover.Dropdown
                  sx={{
                    backgroundColor: SPACEX_COLORS.surface,
                    border: `1px solid ${SPACEX_COLORS.border}`,
                  }}
                >
                  <FiltersPopover 
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedCrew={selectedCrew}
                    setSelectedCrew={setSelectedCrew}
                    onReset={resetFilters}
                    hasFilters={!!hasActiveFilters}
                  />
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Paper>
        </Container>
      </Box>

      {/* Main Content */}
      <ScrollArea 
        sx={{ 
          flex: 1,
          height: `calc(100vh - ${isMobile ? '280px' : '240px'})`,
        }}
        onScrollPositionChange={({ y }) => setScrolled(y > 0)}
      >
        <Container size="xl" px={isMobile ? "md" : "xl"}>
          <Box 
            sx={{ 
              position: 'relative',
              minHeight: 200,
              paddingBottom: isMobile ? 80 : 40,
            }}
          >
            <LoadingOverlay 
              visible={isLoading} 
              overlayBlur={2}
              loaderProps={{ 
                variant: 'dots',
                size: 'xl',
                color: SPACEX_COLORS.primary 
              }}
            />
            
            {isMobile ? (
              <Stack spacing="md">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <Skeleton key={i} height={160} radius="md" />
                  ))
                ) : sortedLaunches?.length === 0 ? (
                  <Paper
                    p="xl"
                    radius="md"
                    sx={{
                      backgroundColor: SPACEX_COLORS.surface,
                      border: `1px solid ${SPACEX_COLORS.border}`,
                      textAlign: 'center',
                    }}
                  >
                    <Text color="dimmed">
                      No launches found matching your filters
                    </Text>
                  </Paper>
                ) : (
                  sortedLaunches?.map(launch => (
                    <LaunchCard
                      key={launch.id}
                      launch={launch}
                      rocketName={rocketNames?.[launch.rocket]}
                      onClick={() => navigate(`/launches/${launch.id}`)}
                    />
                  ))
                )}
              </Stack>
            ) : (
              // Desktop Table View
              <Paper
                radius="md"
                sx={{
                  backgroundColor: SPACEX_COLORS.surface,
                  border: `1px solid ${SPACEX_COLORS.border}`,
                }}
              >
                <Table>
                  <thead
                    style={{
                      position: 'sticky',
                      top: 0,
                      backgroundColor: SPACEX_COLORS.surface,
                      zIndex: 1,
                    }}
                  >
                    <tr>
                      <th>Flight #</th>
                      <th>Mission Name</th>
                      <th>Launch Date</th>
                      <th>Status</th>
                      <th>Crew</th>
                      <th>Rocket</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i}>
                          <td colSpan={7}>
                            <Skeleton height={40} />
                          </td>
                        </tr>
                      ))
                    ) : sortedLaunches?.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <Text align="center" color="dimmed" py="xl">
                            No launches found matching your filters
                          </Text>
                        </td>
                      </tr>
                    ) : (
                      sortedLaunches?.map(launch => (
                        <TableRow
                          key={launch.id}
                          launch={launch}
                          rocketName={rocketNames?.[launch.rocket]}
                          onClick={() => navigate(`/launches/${launch.id}`)}
                        />
                      ))
                    )}
                  </tbody>
                </Table>
              </Paper>
            )}
          </Box>
        </Container>
      </ScrollArea>

      {/* Mobile Navigation */}
      {isMobile && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(20, 22, 25, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: `1px solid ${SPACEX_COLORS.border}`,
            zIndex: 100,
          }}
        >
          <Group position="apart" p="sm">
            <ActionIcon 
              variant="subtle"
              color="gray"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ChevronUp size={20} />
            </ActionIcon>
            <Group>
              <Menu
                position="top"
                shadow="lg"
                width={200}
                styles={{
                  dropdown: {
                    backgroundColor: SPACEX_COLORS.surface,
                    border: `1px solid ${SPACEX_COLORS.border}`,
                  }
                }}
              >
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <CalendarDays size={20} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <FiltersPopover 
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedCrew={selectedCrew}
                    setSelectedCrew={setSelectedCrew}
                    onReset={resetFilters}
                    hasFilters={!!hasActiveFilters}
                  />
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Paper>
      )}
    </Box>
  );
};

export default LaunchListPage;