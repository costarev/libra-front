/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {BottomTabHeaderProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import Colors from '../constants/color-theme.const';
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

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
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
  const auth = React.useContext(AuthContext);

  return (
    <Stack.Navigator>
      {auth.isLogin ? (
        <>
          <Stack.Screen name='Root' component={BottomTabNavigator} options={{headerShown: false}} />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name='Modal' component={ModalScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name='Auth' component={AuthScreen} options={{headerShown: false}} />
      )}
    </Stack.Navigator>
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
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='Library'
        component={LibraryScreen}
        options={{
          title: 'Библиотека',
          tabBarIcon: ({color}) => <TabBarIcon name='book' color={color} />,
          header: ({options}: BottomTabHeaderProps) => (
            <HeaderWithSearch title={options.title}></HeaderWithSearch>
          ),
        }}
      />
      <BottomTab.Screen
        name='Vault'
        component={VaultScreen}
        options={{
          title: 'Хранилище',
          tabBarIcon: ({color}) => <TabBarIcon name='list' color={color} />,
          header: ({options}: BottomTabHeaderProps) => <Header title={options.title}></Header>,
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          title: 'Аккаунт',
          tabBarIcon: ({color}) => <TabBarIcon name='user' color={color} />,
          header: ({options}: BottomTabHeaderProps) => <Header title={options.title}></Header>,
        }}
      />
    </BottomTab.Navigator>
  );
}
