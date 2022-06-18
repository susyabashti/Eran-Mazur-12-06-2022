import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { favoriteActions } from "@store/slices/favorites";
import { userActions } from "@store/slices/user";
import { StatusTypes } from "@store/types/userTypes";
import { CurrentData, FavoriteList } from "@store/types/favoritesTypes";
import { CurrentCity } from "@store/types/currentWeatherTypes";

interface TempData {
  Value: number;
}

interface ResponseData {
  WeatherText: string;
  Temperature: { Imperial: TempData; Metric: TempData };
}

export const getFavoritesWeather = (favorites: FavoriteList) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      userActions.setMessage({
        content: "Fetching favorites data..",
        status: StatusTypes.Waiting,
      })
    );
    dispatch(favoriteActions.setLoading(true));

    const getCurrentWeather = async (key: string) => {
      try {
        const { data } = await axios.get<ResponseData[]>(
          `${import.meta.env.VITE_URL_CURRENT_CONDITIONS}${key}?apikey=${
            import.meta.env.VITE_API_KEY
          }`
        );

        const weatherData: CurrentData = {
          desc: data[0].WeatherText,
          temp: data[0].Temperature.Metric.Value,
        };

        dispatch(favoriteActions.updateFavorite({ key, data: weatherData }));
      } catch (error) {
        throw Error("Couldn't load weather data..");
      }
    };

    try {
      await Promise.all(
        favorites.map(async (item) => {
          try {
            await getCurrentWeather(item.key);
          } catch (error) {
            throw Error("Couldn't load weather data..");
          }
        })
      );

      dispatch(
        userActions.setMessage({
          content: "Fetched data successfully..",
          status: StatusTypes.Success,
        })
      );
    } catch (error) {
      dispatch(
        userActions.setMessage({
          content: "Couldn't fetch weather data..",
          status: StatusTypes.Error,
        })
      );
    } finally {
      dispatch(favoriteActions.setLoading(false));
    }
  };
};

export const toggleFavorite = (isFavorite: boolean, city: CurrentCity) => {
  return (dispatch: Dispatch) => {
    if (isFavorite) {
      dispatch(favoriteActions.removeFavorite(city.key));
    } else {
      dispatch(
        favoriteActions.addFavorite({
          key: city.key,
          name: city.name,
          current: null,
        })
      );
    }
  };
};
