import {ItemCategory} from './../enums/item-category.enum';
import {NotebookDto} from './../dtos/notebook.interface';
import {BookDto} from './../dtos/book.interface';
import {ItemDto} from '../dtos/item.interface';
import {Alert} from 'react-native';
import {createContext} from 'react';

interface Items {
  readonly items: ReadonlyArray<ItemDto>;
  readonly books: ReadonlyArray<BookDto>;
  readonly notebooks: ReadonlyArray<NotebookDto>;
}

export interface ItemsContextState extends Items {
  readonly update: (i: Items) => void;
}

export interface ItemsContextAction {
  type: 'SET_ITEMS';
  items?: ReadonlyArray<ItemDto>;
  books?: ReadonlyArray<BookDto>;
  notebooks?: ReadonlyArray<NotebookDto>;
}

export function itemsContextReducer(
  state: ItemsContextState,
  action: ItemsContextAction
): ItemsContextState {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.items || state.items,
        books: action.books || state.books,
        notebooks: action.notebooks || state.notebooks,
      };
  }
}

export const ItemsContext = createContext<ItemsContextState>({
  items: [],
  books: [],
  notebooks: [],
  update: i => {
    Alert.alert(JSON.stringify(i));
  },
});
