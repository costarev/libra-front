import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableHighlight, ViewStyle} from 'react-native';
import {Color} from '../enums/color.enum';
import {useThemeColor} from '../hooks/use-theme-color.hook';
import {ComponentColors} from '../interfaces/component-colors.interface';
import {ThemeMap} from '../types';

interface ButtonParams {
  text: string;
  onPressFn: () => void;
  style?: TextStyle | ViewStyle;
  theme?: ButtonTheme;
}

export enum ButtonTheme {
  PrimaryCyan = 1,
  PrimaryRed,
  Secondary,
}

const themeMap: ThemeMap = {
  [ButtonTheme.PrimaryCyan]: {
    text: {
      light: Color.White,
      dark: Color.White,
    },
    background: {
      light: Color.Cyan,
      dark: Color.Cyan,
    },
  },
  [ButtonTheme.PrimaryRed]: {
    text: {
      light: Color.White,
      dark: Color.White,
    },
    background: {
      light: Color.Red,
      dark: Color.Red,
    },
  },
  [ButtonTheme.Secondary]: {
    text: {
      light: Color.Cyan,
      dark: Color.GrayLight,
    },
    background: {
      light: Color.CyanLight,
      dark: Color.GrayDark,
    },
  },
};

function useButtonThemeColor(theme: ButtonTheme): ComponentColors {
  const color = useThemeColor(themeMap[theme].text, 'text');
  const backgroundColor = useThemeColor(themeMap[theme].background, 'background');

  return {color, backgroundColor};
}

export function SimpleButton({text, style, theme, onPressFn}: ButtonParams) {
  const mode = theme || ButtonTheme.PrimaryCyan;
  const {color, backgroundColor} = useButtonThemeColor(mode);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={Color.CyanDark}
      style={{...styles.button, backgroundColor, ...style}}
      onPress={onPressFn}
    >
      <Text style={{...styles.text, color}}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
    width: '100%',
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
