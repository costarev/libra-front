import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Text, View} from '../components/text-and-view.component';
import {DEFAULT_IMAGE_URL} from '../constants/default-image-url.const';
import {defaultStyles} from '../constants/default-styles.const';
import {ItemsContext} from '../contexts/items.context';
import {RootStackParamList, RootStackScreenProps} from '../types';

export function ProductScreen({navigation, route}: RootStackScreenProps<'Product'>) {
  const itemsContext = React.useContext(ItemsContext);
  const item = itemsContext.items.find(item => item.itemId === route.params.id);

  return (
    <View style={defaultStyles.screenContainer}>
      <ImageBackground
        imageStyle={styles.image}
        style={styles.imageContainer}
        source={{uri: item.image || DEFAULT_IMAGE_URL}}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  imageContainer: {
    aspectRatio: 4 / 3,
    flex: 1,
  },
});
