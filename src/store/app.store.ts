import { create } from 'zustand';
import { LaunchFilters } from '../types/launch';

interface AppState {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedLaunchFilters: LaunchFilters;
  setSelectedLaunchFilters: (filters: LaunchFilters) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedYear: '',
  setSelectedYear: (year) => set({ selectedYear: year }),
  selectedLaunchFilters: {
    success: null,
    withCrew: null,
  },
  setSelectedLaunchFilters: (filters) => set({ selectedLaunchFilters: filters }),
}));