import React from "react";
import tw from "tailwind-styled-components";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { checkSuggestion, fillSuggestions } from "@store/actions/search";
import { searchActions } from "@store/slices/search";
import { AiOutlineSearch } from "react-icons/ai";
import { SuggestionsList } from "@components/SuggestionsList/SuggestionsList";
import { selectSuggestions } from "@store/selectors/selectors";
import { Suggestion } from "@store/types/searchTypes";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchSuggestions = useAppSelector(selectSuggestions);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounce = React.useRef<number | undefined>(undefined);
  const [isFocused, setFocus] = React.useState(false);

  const showSuggestions = () => setFocus(true);
  const hideSuggestions = () => setFocus(false);

  const checkSearch = React.useCallback(
    (e: React.SyntheticEvent) => {
      const searchInput = (e.target as HTMLInputElement).value;
      clearTimeout(debounce.current);

      debounce.current = setTimeout(() => {
        if (!searchInput.length) return;

        dispatch(fillSuggestions(searchInput));
      }, 400);
    },
    [debounce, dispatch]
  );

  const submitSelection = React.useCallback(
    (e: React.SyntheticEvent, selected: Suggestion) => {
      e.preventDefault();

      if (!selected) return;

      if (inputRef.current) inputRef.current.value = "";

      dispatch(checkSuggestion(selected));
      dispatch(searchActions.resetSuggestions());
    },
    [inputRef, dispatch]
  );

  return (
    <SearchContainer>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Enter a city name"
        onChange={checkSearch}
        onFocus={showSuggestions}
        onBlur={hideSuggestions}
      />
      <SearchButton
        onClick={(event: React.SyntheticEvent) =>
          submitSelection(event, searchSuggestions[0])
        }
      >
        <SearchIcon />
      </SearchButton>
      {isFocused && !!searchSuggestions.length && (
        <SuggestionsList
          suggestions={searchSuggestions}
          clickFunc={submitSelection}
        />
      )}
    </SearchContainer>
  );
};

const SearchContainer = tw.form`
  flex
  flex-col
  self-center
  relative
  w-full
  lg:w-80
  lg:self-start
`;

const SearchButton = tw.button`
  absolute
  right-3
  inset-y-0
  flex
  items-center
  pr-2
  hover:scale-150
  transition
`;

const SearchIcon = tw(AiOutlineSearch)`
  text-xl
`;

const Input = tw.input`
  bg-blue-100
  h-16
  rounded-3xl
  pl-8
  pr-12
  text-lg
  shadow-sm
  transition
  duration-200
  ease-in
  placeholder:font-light
  focus:outline-none
  focus:ring-1
  focus:border-blue-500
  focus:ring-blue-500
`;
