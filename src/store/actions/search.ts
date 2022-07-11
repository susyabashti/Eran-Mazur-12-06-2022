import axios from "axios";
import { DAYS } from "@global/vars";
import { Dispatch } from "@reduxjs/toolkit";
import { currentActions } from "@store/slices/currentWeather";
import { userActions } from "@store/slices/user";
import { searchActions } from "@store/slices/search";
import { Suggestion, SuggestionListType } from "@store/types/searchTypes";
import { StatusTypes } from "@store/types/userTypes";
import {
  CurrentCity,
  ForecastData,
  ForecastList,
} from "@store/types/currentWeatherTypes";

type TempData = {
  Value: number;
  Unit: string;
};

type DayResponseData = {
  EpochDate: number;
  Temperature: { Minimum: TempData; Maximum: TempData };
  Day: { IconPhrase: string };
  Night: { IconPhrase: string };
};

type ForecastResponse = {
  DailyForecasts: DayResponseData[];
};

type AutocompleteResponseData = {
  Key: string;
  LocalizedName: string;
};

type AutocompleteResponseType = AutocompleteResponseData[];

export const fillSuggestions =
  (controller: AbortController | null, searchInput: string) =>
  async (dispatch: Dispatch) => {
    const retrieveSuggestions = async () => {
      try {
        const { data } = await axios.get<AutocompleteResponseType>(
          `${import.meta.env.VITE_URL_AUTOCOMPLETE}?q=${searchInput}&apikey=${
            import.meta.env.VITE_API_KEY
          }`,
          { signal: controller?.signal }
        );

        let listSuggestions: SuggestionListType = [];

        data.map((item: { Key: string; LocalizedName: string }) => {
          const data = {
            key: item.Key,
            name: item.LocalizedName,
          };

          listSuggestions.push(data);
        });
        dispatch(searchActions.setSuggestions(listSuggestions));
      } catch (error) {
        console.log(error);
        throw Error("Couldn't retrieve cities..");
      }
    };

    try {
      await retrieveSuggestions();
    } catch (error) {
      dispatch(
        userActions.setMessage({
          content: "An error has occured!",
          status: StatusTypes.Error,
        })
      );
    }
  };

export const checkSuggestion = (suggestion: Suggestion) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      userActions.setMessage({
        content: `Loading ${suggestion.name}'s weather data..`,
        status: StatusTypes.Waiting,
      })
    );

    dispatch(currentActions.setLoading(true));

    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get<ForecastResponse>(
          `${import.meta.env.VITE_URL_FORECAST}${
            suggestion.key
          }?metric=true&apikey=${import.meta.env.VITE_API_KEY}`
        );
        const fcData = data.DailyForecasts;

        const filteredData: ForecastList = [];
        fcData.map((item) => {
          const dayName = DAYS[new Date(item.EpochDate * 1000).getDay()].short;

          const tempData: ForecastData = {
            dayName,
            temp: {
              min: item.Temperature.Minimum.Value,
              max: item.Temperature.Maximum.Value,
            },
            desc: {
              day: fcData[0].Day.IconPhrase,
              night: fcData[0].Night.IconPhrase,
            },
          };

          filteredData.push(tempData);
        });

        const finalData: CurrentCity = {
          key: suggestion.key,
          name: suggestion.name,
          forecast: filteredData,
        };

        dispatch(currentActions.setCurrentCity(finalData));
      } catch (error) {
        throw Error("Couldn't retrieve weather data.");
      }
    };

    try {
      await fetchWeatherData();
      dispatch(
        userActions.setMessage({
          content: "Retrieved weather data successfully!",
          status: StatusTypes.Success,
        })
      );
    } catch (error) {
      dispatch(
        userActions.setMessage({
          content: "An error has occured!",
          status: StatusTypes.Error,
        })
      );
    } finally {
      dispatch(currentActions.setLoading(false));
    }
  };
};
