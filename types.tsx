/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemCategory} from './enums/item-category.enum';
import {ThemeProps} from './interfaces/color-theme.interface';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  readonly Root: NavigatorScreenParams<RootTabParamList> | undefined;
  readonly Modal: undefined;
  readonly Auth: undefined;
  readonly Category: CategoryRouteParams;
  readonly Product: ProductRouteParams;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  readonly Library: undefined;
  readonly Vault: undefined;
  readonly Account: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type SimpleMap<T = any> = Record<string, T>;

export type ThemeMap = SimpleMap<ThemeProps>;

export type LibraryStackParamList = {
  readonly LibraryMain: undefined;
  readonly LibrarySearch: undefined;
};

export type LibraryStackScreenProps<
  Screen extends keyof (LibraryStackParamList & RootStackParamList)
> = NativeStackScreenProps<RootStackParamList & LibraryStackParamList, Screen>;

export type CategoryRouteParams = {
  readonly categoryName: ItemCategory;
};

export type ProductRouteParams = {
  readonly id: number;
};
