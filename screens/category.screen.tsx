import React from 'react';
import {Text, View} from '../components/text-and-view.component';
import {RootStackParamList, RootStackScreenProps} from '../types';

export function CategoryScreen({navigation, route}: RootStackScreenProps<'Category'>) {
  return (
    <View>
      <Text>Я категория {route.params.categoryName}</Text>
    </View>
  );
}
