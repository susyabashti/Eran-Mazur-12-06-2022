export type FavoriteList = FavoriteData[];

export interface CurrentData {
  temp: number;
  desc: string;
}

export interface FavoriteData {
  key: string;
  name: string;
  current: CurrentData | null;
}

export interface FavoriteState {
  list: FavoriteList;
  isLoading: boolean;
}

export interface UpdateProps {
  key: string;
  data: CurrentData;
}
