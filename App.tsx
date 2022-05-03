import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContext, authContextReducer} from './contexts/auth.context';
import useColorScheme from './hooks/use-color-scheme.hook';
import Navigation from './navigation';
import {AuthService} from './services/auth.service';

export default function App() {
  const colorScheme = useColorScheme();
  const [authContext, dispatch] = React.useReducer(authContextReducer, {
    isLogin: false,
    accessToken: null,
    refreshToken: null,
    signIn: async (login: string, password: string) => {
      try {
        const res = await AuthService.auth(login, password);

        dispatch({type: 'SIGN_IN', accessToken: res.accessToken, refreshToken: res.refreshToken});
      } catch (err) {
        Alert.alert('Произошла ошибка', err);
      }
    },
    signOut: () => {
      dispatch({type: 'SIGN_OUT'});
    },
  });

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
