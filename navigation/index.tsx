/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {BottomTabHeaderProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Alert, ColorSchemeName} from 'react-native';
import {AuthContext} from '../contexts/auth.context';
import useColorScheme from '../hooks/use-color-scheme.hook';
import AuthScreen from '../screens/auth.screen';
import ModalScreen from '../screens/ModalScreen';
import LibraryScreen from '../screens/library.screen';
import {RootStackParamList, RootTabParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import VaultScreen from '../screens/vault.screen';
import AccountScreen from '../screens/account.screen';
import {TabBarIcon} from '../components/tab-bar-icon.component';
import {Header, HeaderWithSearch} from '../components/header.component';
import {colorTheme} from '../constants/color-theme.const';
import {CategoryScreen} from '../screens/category.screen';
import {SearchContext, searchContextReducer} from '../contexts/search.context';
import {SearchService} from '../services/search.service';
import {showError} from '../utils/show-error.util';
import {ProductScreen} from '../screens/product.screen';
import {ItemsContext, itemsContextReducer, ItemsContextState} from '../contexts/items.context';
import {Color} from '../enums/color.enum';

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorTheme[colorScheme]}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const authContext = React.useContext(AuthContext);

  return (
    <Stack.Navigator>
      {authContext.isLogin ? (
        <AuthorizedZone></AuthorizedZone>
      ) : (
        <Stack.Screen name='Auth' component={AuthScreen} options={{headerShown: false}} />
      )}
    </Stack.Navigator>
  );
}

export function AuthorizedZone() {
  const [searchContext, dispatchSearch] = React.useReducer(searchContextReducer, {
    isSearch: false,
    query: null,
    results: null,
    search: (query: string) => {
      dispatchSearch({type: 'START_SEARCH', query});
      // SearchService.useSearch(query)
      //   .then(results => {
      //     dispatchSearch({type: 'SHOW_RESULTS', results});
      //     dispatchItems({type: 'SET_ITEMS', items: results});
      //   })
      //   .catch(e => showError(e));
    },
    cancel: () => {
      dispatchSearch({type: 'CANCEL'});
    },
  });

  const [itemsContext, dispatchItems] = React.useReducer(itemsContextReducer, {
    items: [],
    books: [],
    notebooks: [],
    update: ({items, books, notebooks}) => {
      dispatchItems({type: 'SET_ITEMS', items, books, notebooks});
    },
  });

  return (
    <>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{headerShown: false}} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen
        name='Category'
        component={CategoryScreen}
        options={{
          header: ({navigation, route}) => (
            <Header title={(route.params as any).categoryName} navigation={navigation}></Header>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name='Product'
        component={ProductScreen}
        options={{
          header: ({navigation, route}) => (
            <Header title={(route.params as any).id} navigation={navigation}></Header>
          ),
        }}
      ></Stack.Screen>
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Library'
      screenOptions={{
        tabBarActiveTintColor: colorTheme[colorScheme].colors.primary,
        tabBarStyle: {backgroundColor: colorTheme[colorScheme].colors.background},
      }}
    >
      <BottomTab.Screen
        name='Library'
        component={LibraryScreen}
        options={{
          title: 'Библиотека',
          tabBarIcon: ({color}) => <TabBarIcon name='book' color={color as Color} />,
          header: ({options, navigation}: BottomTabHeaderProps) => (
            <HeaderWithSearch
              title={options.title}
              navigation={navigation as any}
            ></HeaderWithSearch>
          ),
        }}
      />
      <BottomTab.Screen
        name='Vault'
        component={VaultScreen}
        options={{
          title: 'Хранилище',
          tabBarIcon: ({color}) => <TabBarIcon name='list' color={color as Color} />,
          header: ({options, navigation}: BottomTabHeaderProps) => (
            <Header title={options.title} navigation={navigation as any}></Header>
          ),
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          title: 'Аккаунт',
          tabBarIcon: ({color}) => <TabBarIcon name='user' color={color as Color} />,
          header: ({options, navigation}: BottomTabHeaderProps) => (
            <Header title={options.title} navigation={navigation as any}></Header>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
