import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { Text } from "@components/Text/Text";
import { getFavoritesWeather } from "@store/actions/favorites";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { FloatingContainer } from "@styles/shared";
import { LocationName } from "@components/LocationName/LocationName";
import { TempBar } from "@components/TempBar/TempBar";
import {
  selectFavoriteList,
  selectFavoriteLoading,
} from "@store/selectors/selectors";
import { Suggestion } from "@store/types/searchTypes";

export const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(selectFavoriteList);
  const isLoading = useAppSelector(selectFavoriteLoading);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!favoritesList.length) return;

    dispatch(getFavoritesWeather(favoritesList));
  }, [dispatch]);

  const gotoCity = React.useCallback(
    (city: Suggestion) => {
      navigate("/", {
        state: {
          city,
        },
      });
    },
    [navigate]
  );

  if (favoritesList.length <= 0)
    return (
      <NoFavoritesText text="You didn't save any city to favorites yet.." />
    );

  return (
    <FavoritesContainer>
      {!isLoading &&
        favoritesList.map((item) => (
          <FavoriteCard
            key={item.key}
            onClick={() => gotoCity({ key: item.key, name: item.name })}
          >
            <CityName name={item.name} />
            {item.current?.temp && <TempBar tempAvg={item.current.temp} />}
            {item.current?.desc && <Text text={item.current.desc} />}
          </FavoriteCard>
        ))}
    </FavoritesContainer>
  );
};

const FavoritesContainer = tw.div`
    container
    mx-auto
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-5
`;

const FavoriteCard = tw(FloatingContainer)`
  h-60
  grid
  content-between
  text-center
  cursor-pointer
  hover:bg-gray-300
  dark:hover:bg-zinc-700
`;

const CityName = tw(LocationName)`
    font-bold
`;

const NoFavoritesText = tw(Text)`
  text-center
`;
