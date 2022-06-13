import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, Keyboard, StyleSheet, Text} from 'react-native';
import {SearchContext} from '../contexts/search.context';
import {Color} from '../enums/color.enum';
import {useThemeColor} from '../hooks/use-theme-color.hook';
import {ThemeProps} from '../interfaces/color-theme.interface';
import {ComponentColors} from '../interfaces/component-colors.interface';
import {ButtonTheme, SimpleButton} from './button.component';
import {SimpleTextInput} from './input.component';
import {View} from './text-and-view.component';

interface HeaderParams {
  title: string;
  navigation: NativeStackNavigationProp<ParamListBase>;
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

export function Header({title, navigation}: HeaderParams) {
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

export function HeaderWithSearch({title, navigation}: HeaderParams) {
  const {color, backgroundColor} = useHeaderThemeColor();
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchContext = React.useContext(SearchContext);
  const onSearchButtonClick = () => {
    Keyboard.dismiss();
    setSearchQuery('');
    setSearchOpened(false);
    navigation.navigate('LibraryMain');
  };
  let searchTimeout;

  React.useEffect(() => {
    if (searchQuery.length) {
      searchTimeout = setTimeout(() => {
        searchContext.search(searchQuery);
      }, 400);
    } else {
      searchContext.cancel();
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor,
        ...(searchOpened ? styles.containerSearchActive : {}),
      }}
    >
      {searchOpened ? <></> : <Text style={{...styles.text, color}}>{title}</Text>}
      <View style={searchOpened ? styles.searchContainerActive : styles.searchContainer}>
        <SimpleTextInput
          placeholder='Поиск по библиотеке'
          style={searchOpened ? styles.searchInputActive : styles.searchInput}
          value={searchQuery}
          onFocus={() => {
            setSearchOpened(true);
            navigation.navigate('LibrarySearch');
          }}
          onChangeText={setSearchQuery}
        ></SimpleTextInput>
        <SimpleButton
          text='Отменить'
          onPressFn={onSearchButtonClick}
          style={searchOpened ? styles.searchCloseButtonActive : styles.searchCloseButton}
          theme={ButtonTheme.Clear}
          lightText={true}
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
  containerSearchActive: {
    paddingTop: 80,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  searchContainerActive: {
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
  },
  searchInputActive: {
    marginRight: 12,
    flex: 1,
  },
  searchCloseButton: {
    display: 'none',
  },
  searchCloseButtonActive: {
    display: 'flex',
    flex: 0,
    minWidth: 60,
  },
});
