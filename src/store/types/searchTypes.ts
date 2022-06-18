export type SuggestionListType = Suggestion[];

export interface Suggestion {
  key: string;
  name: string;
}

export interface SearchState {
  suggestions: SuggestionListType;
}
