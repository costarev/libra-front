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
  lightText?: boolean;
}

export enum ButtonTheme {
  PrimaryCyan = 1,
  PrimaryRed,
  Secondary,
  Clear,
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
  [ButtonTheme.Clear]: {
    text: {
      light: Color.Cyan,
      dark: Color.Cyan,
    },
    background: {
      light: Color.White,
      dark: Color.Black,
    },
  },
};

const underlayColorMap = {
  [ButtonTheme.PrimaryCyan]: Color.CyanDark,
  [ButtonTheme.PrimaryRed]: Color.RedDark,
  [ButtonTheme.Secondary]: Color.CyanLight,
  [ButtonTheme.Clear]: Color.White,
};

function useButtonThemeColor(theme: ButtonTheme): ComponentColors {
  const color = useThemeColor(themeMap[theme].text, 'text');
  const backgroundColor = useThemeColor(themeMap[theme].background, 'background');

  return {color, backgroundColor};
}

export function SimpleButton({text, style, theme, lightText, onPressFn}: ButtonParams) {
  const mode = theme || ButtonTheme.PrimaryCyan;
  const {color, backgroundColor} = useButtonThemeColor(mode);
  const underlayColor = underlayColorMap[mode];

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={underlayColor}
      style={{...styles.button, backgroundColor, ...style}}
      onPress={onPressFn}
    >
      <Text style={{...styles.text, color, ...(lightText ? styles.lightText : {})}}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  lightText: {
    fontWeight: '400',
  },
});
