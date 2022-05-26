import React from 'react';
import {Text as DefaultText, View as DefaultView} from 'react-native';
import {Color} from '../enums/color.enum';
import {useThemeColor} from '../hooks/use-theme-color.hook';

type ThemeProps = {
  lightColor?: Color;
  darkColor?: Color;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor(
    {light: lightColor || Color.Black, dark: darkColor || Color.White},
    'text'
  );

  return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}
