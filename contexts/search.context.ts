import {ItemDto} from './../dtos/item.interface';
import {Alert} from 'react-native';
import {createContext} from 'react';

export interface SearchContextState {
  readonly isSearch: boolean;
  readonly results: ReadonlyArray<ItemDto> | null;
  readonly query: string | null;
  readonly search: (q: string) => void;
  readonly cancel: () => void;
}

export interface SearchContextAction {
  type: 'START_SEARCH' | 'SHOW_RESULTS' | 'CANCEL';
  results?: ReadonlyArray<ItemDto>;
  query?: string;
}

export function searchContextReducer(
  state: SearchContextState,
  action: SearchContextAction
): SearchContextState {
  switch (action.type) {
    case 'START_SEARCH':
      return {
        ...state,
        isSearch: true,
        query: action.query,
      };
    case 'SHOW_RESULTS':
      return {
        ...state,
        isSearch: false,
        results: action.results,
      };
    case 'CANCEL':
      return {
        ...state,
        isSearch: false,
        query: null,
        results: null,
      };
  }
}

export const SearchContext = createContext<SearchContextState>({
  isSearch: false,
  results: null,
  query: null,
  search: (q: string) => {
    Alert.alert(q);
  },
  cancel: () => {},
});
