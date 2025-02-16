import { create } from 'zustand';

interface LaunchFilters {
  success: boolean | null;
  withCrew: boolean | null;
}

interface AppState {
  selectedLaunchFilters: LaunchFilters;
  selectedYear: string | null;
  setLaunchFilters: (filters: Partial<LaunchFilters>) => void;
  setSelectedYear: (year: string | null) => void;
  resetFilters: () => void;
}

const initialFilters: LaunchFilters = {
  success: null,
  withCrew: null
};

export const useAppStore = create<AppState>((set) => ({
  selectedLaunchFilters: initialFilters,
  selectedYear: null,
  
  setLaunchFilters: (filters) => 
    set((state) => ({
      selectedLaunchFilters: {
        ...state.selectedLaunchFilters,
        ...filters
      }
    })),
    
  setSelectedYear: (year) => set({ selectedYear: year }),
  
  resetFilters: () => set({
    selectedLaunchFilters: initialFilters,
    selectedYear: null
  })
}));