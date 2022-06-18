import { Suggestion, SuggestionListType } from "@store/types/searchTypes";
import React from "react";
import tw from "tailwind-styled-components";

interface SuggestionsListProps {
  suggestions: SuggestionListType;
  clickFunc: (event: React.SyntheticEvent, selected: Suggestion) => void;
}

export const SuggestionsList = React.memo(
  ({ suggestions, clickFunc }: SuggestionsListProps) => {
    return (
      <SuggestionList>
        {suggestions.map((item) => (
          <SuggestionKey
            key={item.key}
            onMouseDown={(event: React.SyntheticEvent) =>
              clickFunc(event, item)
            }
          >
            {item.name}
          </SuggestionKey>
        ))}
      </SuggestionList>
    );
  }
);

const SuggestionList = tw.div`
  absolute
  z-20
  inset-y-20
  overflow-y-auto
  bg-blue-100
  p-1
  h-fit
  max-h-32
  w-1/2
  rounded-xl
  shadow-lg
`;

const SuggestionKey = tw.button`
  block
  p-2
  rounded-lg
  hover:bg-blue-200
  w-full
  text-left
`;
