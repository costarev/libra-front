import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Color} from '../enums/color.enum';
import {useThemeColor} from '../hooks/use-theme-color.hook';
import {ThemeProps} from '../interfaces/color-theme.interface';
import {ComponentColors} from '../interfaces/component-colors.interface';

type InputParams = TextInput['props'];

const themeProps: ThemeProps = {
  text: {
    light: Color.Gray,
    dark: Color.GrayLight,
  },
  background: {
    light: Color.GrayLight,
    dark: Color.GrayDark,
  },
};

function useDefaultInputThemeColor(): ComponentColors {
  const color = useThemeColor(themeProps.text, 'text');
  const backgroundColor = useThemeColor(themeProps.background, 'background');

  return {color, backgroundColor};
}

export function SimpleTextInput(props: InputParams) {
  const {color, backgroundColor} = useDefaultInputThemeColor();

  return (
    <TextInput
      {...props}
      style={{...styles.input, color, backgroundColor, ...(props.style as any)}}
    ></TextInput>
  );
}

export function PasswordInput(props: InputParams) {
  const {color, backgroundColor} = useDefaultInputThemeColor();

  return (
    <TextInput
      {...props}
      style={{...styles.input, color, backgroundColor, ...(props.style as any)}}
      secureTextEntry={true}
      textContentType='password'
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 12,
    paddingLeft: 16,
    fontSize: 16,
  },
});
