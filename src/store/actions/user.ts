import { DEFAULT_CITY } from "@global/vars";
import { Dispatch } from "@reduxjs/toolkit";
import { userActions } from "@store/slices/user";
import { StatusTypes } from "@store/types/userTypes";
import axios from "axios";

type LocationResponseData = {
  Key: string;
  LocalizedName: string;
};

export const getUserLocation = () => (dispatch: Dispatch) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const getLocation = async () => {
          try {
            const { data } = await axios.get<LocationResponseData>(
              `${import.meta.env.VITE_URL_LOCATION}?toplevel=true&apikey=${
                import.meta.env.VITE_API_KEY
              }&q=${pos.coords.latitude},${pos.coords.longitude}`
            );

            if (typeof data.Key !== "undefined") {
              dispatch(
                userActions.setUserLocation({
                  key: data.Key,
                  name: data.LocalizedName,
                })
              );
            }
          } catch (error) {
            throw Error("Couldn't retrieve data..");
          }
        };

        try {
          await getLocation();
        } catch (error) {
          dispatch(
            userActions.setMessage({
              content: "An error has occured!",
              status: StatusTypes.Error,
            })
          );
        } finally {
          dispatch(userActions.setFirstLoadState(false));
        }
      },
      () => {
        dispatch(userActions.setFirstLoadState(false));
      }
    );
  } else {
    dispatch(userActions.setFirstLoadState(false));
  }
};
