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
  const axiosController = React.useRef<AbortController | null>(
    new AbortController()
  );

  const showSuggestions = () => setFocus(true);
  const hideSuggestions = () => setFocus(false);

  const checkSearch = () => {
    clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      if (!inputRef.current?.value.length) return;
      axiosController.current?.abort();
      axiosController.current = new AbortController();

      dispatch(
        fillSuggestions(axiosController.current, inputRef.current.value)
      );
    }, 400);
  };

  const submitSelection = (selected: Suggestion) => {
    if (!selected) return;

    if (inputRef.current) inputRef.current.value = "";

    dispatch(checkSuggestion(selected));
    dispatch(searchActions.resetSuggestions());
  };

  return (
    <SearchContainer>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Enter a city name"
        onChange={() => checkSearch()}
        onFocus={showSuggestions}
        onBlur={hideSuggestions}
      />
      <SearchButton
        onClick={(e: React.SyntheticEvent) => {
          e.preventDefault();
          submitSelection(searchSuggestions[0]);
        }}
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
  lg:w-96
  lg:self-start
`;

const SearchButton = tw.button`
  absolute
  right-2
  inset-y-0
  flex
  items-center
  pr-2
  pl-1
  hover:scale-150
  transition
  active:text-pink-600
  dark:text-white
  dark:active:text-pink-600
`;

const SearchIcon = tw(AiOutlineSearch)`
  text-2xl
`;

const Input = tw.input`
  bg-slate-200
  dark:bg-zinc-800
  h-16
  pl-8
  pr-12
  text-lg
  shadow-sm
  transition
  duration-200
  ease-in
  placeholder:font-light
  placholder:text-white
  focus:outline-none
  focus:ring-1
  rounded-3xl
  focus:border-blue-500
  focus:ring-blue-500
  dark:focus:border-zinc-400
  dark:focus:ring-zinc-700
`;
