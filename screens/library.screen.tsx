import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Feed} from '../components/feed.component';
import {Text, View} from '../components/text-and-view.component';
import {defaultStyles} from '../constants/default-styles.const';
import {Color} from '../enums/color.enum';
import {FeedProps, FeedsData} from '../interfaces/feed-props.interface';
import {MiniCardsData} from '../interfaces/mini-card-props.interface';
import {LibraryStackParamList, RootTabScreenProps} from '../types';
import LibraryMainScreen from './library-main.screen';
import LibrarySearchScreen from './library-search.screen';

const Library = createNativeStackNavigator<LibraryStackParamList>();

export default function LibraryScreen({navigation}: RootTabScreenProps<'Library'>) {
  return (
    <Library.Navigator initialRouteName='LibraryMain'>
      <Library.Screen
        name='LibraryMain'
        component={LibraryMainScreen}
        options={{headerShown: false, animation: 'fade'}}
      ></Library.Screen>
      <Library.Screen
        name='LibrarySearch'
        component={LibrarySearchScreen}
        options={{headerShown: false, animation: 'fade', gestureEnabled: false}}
      ></Library.Screen>
    </Library.Navigator>
  );
}

const styles = StyleSheet.create({});
