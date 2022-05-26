import React from 'react';
import {StyleSheet} from 'react-native';
import {ButtonTheme, SimpleButton} from '../components/button.component';
import {Text, View} from '../components/text-and-view.component';
import {defaultStyles} from '../constants/default-styles.const';
import {AuthContext} from '../contexts/auth.context';
import {RootTabScreenProps} from '../types';

export default function SearchScreen({navigation}: RootTabScreenProps<'Account'>) {
  return (
    <View style={defaultStyles.screenContainer}>
      <Text>Это поиск</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
