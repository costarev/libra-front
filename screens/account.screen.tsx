import React from 'react';
import {StyleSheet} from 'react-native';
import {ButtonTheme, SimpleButton} from '../components/button.component';
import {Text, View} from '../components/text-and-view.component';
import {defaultStyles} from '../constants/default-styles.const';
import {AuthContext} from '../contexts/auth.context';
import {RootTabScreenProps} from '../types';

export default function AccountScreen({navigation}: RootTabScreenProps<'Account'>) {
  const authContext = React.useContext(AuthContext);

  return (
    <View style={defaultStyles.screenContainer}>
      <Text>Кирилл Костарев</Text>
      <SimpleButton
        text='Выйти из аккаунта'
        theme={ButtonTheme.PrimaryRed}
        onPressFn={authContext.signOut}
      ></SimpleButton>
    </View>
  );
}

const styles = StyleSheet.create({});
