import { Suggestion } from "@store/types/searchTypes";

export const DAYS = [
  {
    long: "Sunday",
    short: "Sun",
  },
  {
    long: "Monday",
    short: "Mon",
  },
  {
    long: "Tuesday",
    short: "Tue",
  },
  {
    long: "Wednesday",
    short: "Wed",
  },
  {
    long: "Thursday",
    short: "Thu",
  },
  {
    long: "Friday",
    short: "Fri",
  },
  {
    long: "Saturday",
    short: "Sat",
  },
];

export const DEFAULT_CITY: Suggestion = {
  key: "215854",
  name: "Tel Aviv",
};

export const MESSAGE_REMOVE_DELAY = 3000;
