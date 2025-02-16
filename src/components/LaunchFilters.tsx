import { Group, Switch, Select, Button } from '@mantine/core';
import { useAppStore } from '../store/app.store';

const YEARS = Array.from({ length: 11 }, (_, i) => ({
  value: String(2024 - i),
  label: String(2024 - i)
}));

export function LaunchFilters() {
  const { selectedLaunchFilters, setLaunchFilters, selectedYear, setSelectedYear } = useAppStore();

  const resetFilters = () => {
    setLaunchFilters({
      success: null,
      withCrew: null
    });
    setSelectedYear(null);
  };

  return (
    <Group position="apart" mb="xl">
      <Group>
        <Select
          label="Launch Year"
          placeholder="Select year"
          clearable
          value={selectedYear}
          onChange={setSelectedYear}
          data={YEARS}
          style={{ width: 200 }}
        />
        
        <Switch
          label="Successful Launches Only"
          checked={selectedLaunchFilters.success === true}
          onChange={(event) => setLaunchFilters({ 
            success: event.currentTarget.checked ? true : null 
          })}
        />

        <Switch
          label="Crewed Missions Only"
          checked={selectedLaunchFilters.withCrew === true}
          onChange={(event) => setLaunchFilters({ 
            withCrew: event.currentTarget.checked ? true : null 
          })}
        />
      </Group>

      <Button 
        variant="subtle" 
        onClick={resetFilters}
        disabled={!selectedYear && !selectedLaunchFilters.success && !selectedLaunchFilters.withCrew}
      >
        Reset Filters
      </Button>
    </Group>
  );
}