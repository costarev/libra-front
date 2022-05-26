import {Theme} from '@react-navigation/native';
import {Color} from './../enums/color.enum';

export const colorTheme: {light: Theme; dark: Theme} = {
  light: {
    colors: {
      text: Color.Black,
      background: Color.White,
      primary: Color.Cyan,
      border: '#f0f0f0',
      card: Color.Gray,
      notification: Color.White,
    },
    dark: false,
  },
  dark: {
    dark: true,
    colors: {
      text: Color.White,
      background: Color.Black,
      primary: Color.Cyan,
      border: '#101010',
      card: Color.Gray,
      notification: Color.GrayDark,
    },
  },
};
