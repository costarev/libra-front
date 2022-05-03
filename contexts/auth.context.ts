import {Alert} from 'react-native';
import {createContext} from 'react';

export interface AuthContextState {
  readonly isLogin: boolean;
  readonly accessToken: string | null;
  readonly refreshToken: string | null;
  readonly signIn: (l: string, p: string) => void;
  readonly signOut: () => void;
}

export interface AuthContextAction {
  type: 'SIGN_IN' | 'SIGN_OUT';
  accessToken?: string;
  refreshToken?: string;
}

export function authContextReducer(
  state: AuthContextState,
  action: AuthContextAction
): AuthContextState {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLogin: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isLogin: false,
        accessToken: null,
        refreshToken: null,
      };
  }
}

export const AuthContext = createContext<AuthContextState>({
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  signIn: (login: string, password: string) => {
    Alert.alert(login + ' ' + password);
  },
  signOut: () => {},
});
