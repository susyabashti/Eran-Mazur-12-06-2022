export type Temperature = {
  min: number;
  max: number;
};

export type Description = {
  day: string;
  night: string;
};

export type ForecastData = {
  dayName: string;
  temp: Temperature;
  desc: Description;
};

export type CurrentCity = {
  key: string;
  name: string;
  forecast: ForecastList;
};

export interface CurrentState {
  current: CurrentCity | null;
  isLoading: boolean;
}

export type ForecastList = ForecastData[];
