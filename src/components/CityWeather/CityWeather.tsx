import tw from "tailwind-styled-components";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { Text } from "@components/Text/Text";
import { SaveButton } from "@components/SaveButton/SaveButton";
import { TempBar } from "@components/TempBar/TempBar";
import { LocationName } from "@components/LocationName/LocationName";
import { FloatingContainer } from "@styles/shared";
import {
  selectCurrentCity,
  selectCurrentLoading,
  selectFirstLoadState,
  selectUserLocationCity,
} from "@store/selectors/selectors";
import { BiSun, BiMoon } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { checkSuggestion } from "@store/actions/search";
import { Suggestion } from "@store/types/searchTypes";
import React from "react";
import { getUserLocation } from "@store/actions/user";

type HomeState = {
  city: Suggestion;
};

export const CityWeather = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCurrentCity);
  const isLoading = useAppSelector(selectCurrentLoading);
  const isFirstLoad = useAppSelector(selectFirstLoadState);
  const userLocationCity = useAppSelector(selectUserLocationCity);
  const location = useLocation();
  const locationState = location.state as HomeState;
  const cityRequested = locationState?.city || userLocationCity;

  React.useEffect(() => {
    if (isFirstLoad) {
      dispatch(getUserLocation());
    } else {
      dispatch(checkSuggestion(cityRequested));
    }
  }, [isFirstLoad, cityRequested, dispatch]);

  if (!currentCity || isLoading) return null;

  return (
    <CityContainer>
      <CityHeader>
        <HeaderCol>
          <LocationName name={currentCity.name} />
          <TempBar tempMinMax={currentCity.forecast[0].temp} />
        </HeaderCol>
        <HeaderCol>
          <SaveButton city={currentCity} />
        </HeaderCol>
      </CityHeader>
      <DayDescription>
        <SunIcon />
        <DescText text={currentCity.forecast[0].desc.day} />
      </DayDescription>
      <NightDescription>
        <MoonIcon />
        <DescText text={currentCity.forecast[0].desc.night} />
      </NightDescription>
      <ForecastContainter>
        {currentCity.forecast.map((day) => {
          return (
            <DayInfo key={day.dayName}>
              <DayName text={day.dayName} />
              <TempBar tempMinMax={day.temp} />
            </DayInfo>
          );
        })}
      </ForecastContainter>
    </CityContainer>
  );
};

const CityContainer = tw.div`
  w-full
  grid
  grid-cols-2
  gap-5
`;

const CityHeader = tw(FloatingContainer)`
  flex
  justify-between
  col-span-full
`;

const HeaderCol = tw.div`
  flex
  flex-col
  gap-0
`;

const DescText = tw(Text)`
  text-center
  text-xl
  font-semibold
`;

const DescriptionBlock = tw(FloatingContainer)`
  grid
  place-content-between
  justify-center
  text-white
  relative
  overflow-clip
`;

const DayDescription = tw(DescriptionBlock)`
  bg-gradient-to-tr
  from-yellow-300
  to-amber-500
`;

const NightDescription = tw(DescriptionBlock)`
  bg-gradient-to-b
  from-black
  to-blue-900
`;

const ForecastContainter = tw.div`
  col-span-full
  grid
  grid-flow-col
  gap-5
  overflow-x-auto
`;

const DayInfo = tw(FloatingContainer)`
  grid
  content-center
  h-full
  text-center
`;

const DayName = tw(Text)`
  text-2xl
  font-semibold
`;

const SunIcon = tw(BiSun)`
  w-full
  text-5xl
`;

const MoonIcon = tw(BiMoon)`
  w-full
  text-5xl
`;
