import { create } from 'zustand';

interface LaunchFilters {
  success: boolean | null;
  withCrew: boolean | null;
}

interface AppState {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedLaunchFilters: LaunchFilters;
  setSelectedLaunchFilters: (filters: LaunchFilters) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedYear: '',
  setSelectedYear: (year: string) => set({ selectedYear: year }),
  
  selectedLaunchFilters: {
    success: null,
    withCrew: null,
  },
  setSelectedLaunchFilters: (filters: LaunchFilters) => 
    set({ selectedLaunchFilters: filters }),
}));