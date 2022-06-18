import { Suggestion } from "./searchTypes";

export enum StatusTypes {
  Success,
  Error,
  Waiting,
}

export type MessageValues = {
  content: string;
  status: StatusTypes;
};

export interface UserState {
  notification: MessageValues | null;
  isMetric: boolean;
  isDark: boolean;
  firstLoad: boolean;
  userLocation: Suggestion | null;
}
