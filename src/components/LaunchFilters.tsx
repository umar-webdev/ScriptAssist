import { Group, Select, Button, Stack, Paper, Popover } from '@mantine/core';
import { Filter, FilterX } from 'lucide-react';
import { useAppStore } from '../store/app.store';
import { useState } from 'react';

const years = Array.from({ length: 11 }, (_, i) => (2013 + i).toString());

export function LaunchFilters() {
  const [opened, setOpened] = useState(false);
  const { 
    selectedYear, 
    setSelectedYear,
    selectedLaunchFilters,
    setSelectedLaunchFilters
  } = useAppStore();

  const resetFilters = () => {
    setSelectedYear('');
    setSelectedLaunchFilters({
      success: null,
      withCrew: null
    });
  };

  const hasActiveFilters = selectedYear || 
    selectedLaunchFilters.success !== null || 
    selectedLaunchFilters.withCrew !== null;

  return (
    <Popover 
      opened={opened} 
      onChange={setOpened} 
      position="bottom-end" 
      shadow="md" 
      width={260}
    >
      <Popover.Target>
        <Button 
          variant={hasActiveFilters ? "filled" : "light"}
          leftIcon={hasActiveFilters ? <Filter size={16} /> : <FilterX size={16} />}
          color={hasActiveFilters ? "primary" : "gray"}
          onClick={() => setOpened((o) => !o)}
          sx={(theme) => ({
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            }
          })}
        >
          Filters {hasActiveFilters && '(Active)'}
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack spacing="md">
          <Select
            label="Launch Year"
            placeholder="All years"
            value={selectedYear}
            onChange={setSelectedYear}
            data={[
              { value: '', label: 'All years' },
              ...years.map(year => ({ value: year, label: year }))
            ]}
            searchable
            clearable
          />

          <Select
            label="Mission Status"
            placeholder="All statuses"
            value={selectedLaunchFilters.success === null ? '' : 
                   selectedLaunchFilters.success ? 'success' : 'failed'}
            onChange={(value) => setSelectedLaunchFilters({
              ...selectedLaunchFilters,
              success: value === '' ? null : value === 'success'
            })}
            data={[
              { value: '', label: 'All statuses' },
              { value: 'success', label: 'Successful' },
              { value: 'failed', label: 'Failed' }
            ]}
          />

          <Select
            label="Crew Filter"
            placeholder="All missions"
            value={selectedLaunchFilters.withCrew === null ? '' :
                   selectedLaunchFilters.withCrew ? 'crew' : 'no-crew'}
            onChange={(value) => setSelectedLaunchFilters({
              ...selectedLaunchFilters,
              withCrew: value === '' ? null : value === 'crew'
            })}
            data={[
              { value: '', label: 'All missions' },
              { value: 'crew', label: 'Crewed missions' },
              { value: 'no-crew', label: 'Uncrewed missions' }
            ]}
          />

          <Button 
            variant="light"
            color="gray"
            leftIcon={<FilterX size={16} />}
            onClick={() => {
              resetFilters();
              setOpened(false);
            }}
            disabled={!hasActiveFilters}
            fullWidth
          >
            Reset Filters
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}