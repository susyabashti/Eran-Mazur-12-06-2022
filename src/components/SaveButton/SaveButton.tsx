import tw from "tailwind-styled-components";
import { toggleFavorite } from "@store/actions/favorites";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { isFavoriteSelector } from "@store/selectors/selectors";
import { CurrentCity } from "@store/types/currentWeatherTypes";

interface SaveButtonProps {
  city: CurrentCity;
}

export const SaveButton = ({ city }: SaveButtonProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    isFavoriteSelector(state, city.key)
  );

  const buttonToggleFavorite = () => dispatch(toggleFavorite(isFavorite, city));

  return (
    <SaveButtonContainer onClick={buttonToggleFavorite}>
      {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
    </SaveButtonContainer>
  );
};

const SaveButtonContainer = tw.button`
  text-red-500
  text-5xl
  hover:scale-110
  transition-transform
  active:-translate-y-1
  duration-200
`;
