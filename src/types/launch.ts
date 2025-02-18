export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  flight_number: number;
  crew: any[];
  rocket: string;
  upcoming: boolean;
  details: string | null;
  links?: {
    patch?: {
      small: string | null;
      large: string | null;
    };
  };
  launchpad?: string;
}

export interface LaunchFilters {
  success: boolean | null;
  withCrew: boolean | null;
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
  description: string;
  height: {
    meters: number;
  };
  mass: {
    kg: number;
  };
  success_rate_pct: number;
}

export interface Launchpad {
  id: string;
  name: string;
  locality: string;
  region: string;
  status: string;
  details: string;
}