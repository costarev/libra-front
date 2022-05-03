import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Color} from '../enums/color.enum';
import {useThemeColor} from '../hooks/use-theme-color.hook';
import {ThemeProps} from '../interfaces/color-theme.interface';
import {ComponentColors} from '../interfaces/component-colors.interface';
import {SimpleButton} from './button.component';
import {SimpleTextInput} from './input.component';
import {View} from './text-and-view.component';

interface HeaderParams {
  title: string;
}

const themeProps: ThemeProps = {
  text: {
    light: Color.Black,
    dark: Color.White,
  },
  background: {
    light: Color.White,
    dark: Color.Black,
  },
};

function useHeaderThemeColor(): ComponentColors {
  const color = useThemeColor(themeProps.text, 'text');
  const backgroundColor = useThemeColor(themeProps.background, 'background');

  return {color, backgroundColor};
}

export function Header({title}: HeaderParams) {
  const {color, backgroundColor} = useHeaderThemeColor();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor,
      }}
    >
      <Text style={{...styles.text, color}}>{title}</Text>
    </View>
  );
}

export function HeaderWithSearch({title}: HeaderParams) {
  const {color, backgroundColor} = useHeaderThemeColor();
  const [searchOpened, setSearchOpened] = React.useState(false);
  const inputRef = React.useRef(null);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor,
      }}
    >
      <Text style={{...styles.text, color}}>{title}</Text>
      <View style={styles.searchContainer}>
        <SimpleTextInput
          placeholder='Поиск по библиотеке'
          style={searchOpened ? styles.searchInputActive : styles.searchInput}
          onFocus={() => setSearchOpened(true)}
          onBlur={() => setSearchOpened(false)}
        ></SimpleTextInput>
        <SimpleButton
          text='Отменить'
          onPressFn={() => {
            // inputRef.current.blur();
          }}
          style={searchOpened ? styles.searchCloseButtonActive : styles.searchCloseButton}
        ></SimpleButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 100,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  searchContainer: {
    flexDirection: 'row',
  },
  searchInput: {
    marginTop: 20,
  },
  searchInputActive: {
    marginTop: 20,
    marginRight: 12,
    flex: 4,
  },
  searchCloseButton: {
    display: 'none',
  },
  searchCloseButtonActive: {
    display: 'flex',
    flex: 1,
  },
});
